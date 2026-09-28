#!/usr/bin/env node
/**
 * One-time local helper to obtain a Google OAuth refresh token for the
 * calendar booking feature. Node built-ins only — no dependencies.
 *
 * Usage:
 *   1. Put GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.local
 *      (see .env.example for how to create them).
 *   2. Run: node scripts/google-auth.mjs
 *   3. Open the printed URL, sign in as the calendar owner, approve access.
 *   4. The script prints GOOGLE_REFRESH_TOKEN — paste it into .env.local.
 */

import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";

const PORT = 5555;
const REDIRECT_URI = `http://localhost:${PORT}/callback`;
const SCOPES = [
  "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/calendar.freebusy",
].join(" ");

/** Loads simple KEY=VALUE lines from .env.local without adding a dotenv dependency. */
function loadDotEnvLocal() {
  const path = ".env.local";
  if (!existsSync(path)) return;

  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadDotEnvLocal();

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error(
    "Missing GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET.\n" +
      "Add them to .env.local first (see .env.example)."
  );
  process.exit(1);
}

const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
authUrl.searchParams.set("client_id", clientId);
authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
authUrl.searchParams.set("response_type", "code");
authUrl.searchParams.set("scope", SCOPES);
authUrl.searchParams.set("access_type", "offline");
authUrl.searchParams.set("prompt", "consent"); // forces a refresh_token even on repeat runs

console.log("\nOpen this URL, sign in as the calendar owner, and approve access:\n");
console.log(authUrl.toString());
console.log(`\nWaiting for the redirect on ${REDIRECT_URI} ...\n`);

const server = createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI);
  if (url.pathname !== "/callback") {
    res.writeHead(404).end();
    return;
  }

  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error || !code) {
    res.writeHead(400, { "Content-Type": "text/plain" }).end(`Auth failed: ${error ?? "no code"}`);
    console.error("Auth failed:", error ?? "no code returned");
    server.close();
    process.exit(1);
  }

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
      }),
    });

    const data = await tokenRes.json();

    if (!tokenRes.ok || !data.refresh_token) {
      res.writeHead(500, { "Content-Type": "text/plain" }).end("Token exchange failed — check the terminal.");
      console.error("Token exchange failed:", data);
      console.error(
        "\nIf there is no refresh_token in the response, the account most likely already " +
          "granted this app access before. Revoke access at https://myaccount.google.com/permissions " +
          "and run this script again."
      );
      server.close();
      process.exit(1);
    }

    res.writeHead(200, { "Content-Type": "text/plain" }).end("Done — you can close this tab.");
    console.log("Success! Add this to .env.local:\n");
    console.log(`GOOGLE_REFRESH_TOKEN=${data.refresh_token}\n`);
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" }).end("Token exchange failed — check the terminal.");
    console.error("Token exchange failed:", err);
  } finally {
    server.close();
  }
});

server.listen(PORT);
