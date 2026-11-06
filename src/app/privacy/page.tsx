import type { Metadata } from "next";
import { privacyPolicy } from "@/content/legal/legal";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: privacyPolicy.title,
  description: privacyPolicy.description,
  path: "/privacy",
});

export default function PrivacyPage() {
  return <LegalPage doc={privacyPolicy} />;
}
