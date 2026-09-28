const API_URL = "https://api.openai.com/v1/chat/completions";

// Best price/quality for a tool-calling site assistant: fast, no reasoning latency.
export const MODEL = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";

export interface ToolCall {
  id: string;
  name: string;
  args: Record<string, unknown>;
}

export type ChatMessage =
  | { role: "system" | "user"; content: string }
  | {
      role: "assistant";
      content: string | null;
      tool_calls?: Array<{
        id: string;
        type: "function";
        function: { name: string; arguments: string };
      }>;
    }
  | { role: "tool"; tool_call_id: string; content: string };

export interface FunctionDeclaration {
  name: string;
  description: string;
  parameters: {
    type: "object";
    properties: Record<string, { type: string; description: string; enum?: string[] }>;
    required?: string[];
  };
}

export type StreamEvent =
  | { type: "text"; value: string }
  | { type: "tool_calls"; calls: ToolCall[] };

interface StreamChunk {
  choices?: Array<{
    delta?: {
      content?: string | null;
      tool_calls?: Array<{
        index: number;
        id?: string;
        function?: { name?: string; arguments?: string };
      }>;
    };
  }>;
  error?: { message?: string };
}

/**
 * Streams one OpenAI turn. Yields text deltas as they arrive and, once the
 * stream ends, a single `tool_calls` event if the model asked for tools.
 * Plain fetch against the Chat Completions SSE endpoint — no SDK dependency.
 */
export async function* streamOpenAI(params: {
  messages: ChatMessage[];
  tools: FunctionDeclaration[];
  signal?: AbortSignal;
}): AsyncGenerator<StreamEvent> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not set");

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    signal: params.signal,
    body: JSON.stringify({
      model: MODEL,
      stream: true,
      temperature: 0.4,
      max_tokens: 700,
      messages: params.messages,
      tools: params.tools.length
        ? params.tools.map((t) => ({ type: "function", function: t }))
        : undefined,
    }),
  });

  if (!res.ok || !res.body) {
    const detail = await res.text().catch(() => "");
    throw new Error(`OpenAI ${res.status}: ${detail.slice(0, 300)}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  const pending = new Map<number, { id: string; name: string; args: string }>();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;

      const payload = trimmed.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;

      let chunk: StreamChunk;
      try {
        chunk = JSON.parse(payload);
      } catch {
        continue;
      }

      if (chunk.error) throw new Error(chunk.error.message ?? "OpenAI error");

      const delta = chunk.choices?.[0]?.delta;
      if (!delta) continue;

      if (delta.content) yield { type: "text", value: delta.content };

      for (const tc of delta.tool_calls ?? []) {
        const entry = pending.get(tc.index) ?? { id: "", name: "", args: "" };
        if (tc.id) entry.id = tc.id;
        if (tc.function?.name) entry.name += tc.function.name;
        if (tc.function?.arguments) entry.args += tc.function.arguments;
        pending.set(tc.index, entry);
      }
    }
  }

  if (pending.size) {
    const calls: ToolCall[] = [...pending.entries()]
      .sort(([a], [b]) => a - b)
      .map(([, c]) => {
        let args: Record<string, unknown> = {};
        try {
          args = c.args ? JSON.parse(c.args) : {};
        } catch {
          /* malformed args -> tool validation will reject */
        }
        return { id: c.id, name: c.name, args };
      });
    yield { type: "tool_calls", calls };
  }
}
