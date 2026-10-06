import type { Metadata } from "next";
import { privacyPolicy } from "@/content/legal/legal";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: `${privacyPolicy.title} — Serhii Kushnir`,
  description: privacyPolicy.description,
};

export default function PrivacyPage() {
  return <LegalPage doc={privacyPolicy} />;
}
