import type { Metadata } from "next";
import { termsOfService } from "@/content/legal/legal";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: `${termsOfService.title} — Serhii Kushnir`,
  description: termsOfService.description,
};

export default function TermsPage() {
  return <LegalPage doc={termsOfService} />;
}
