import type { Metadata } from "next";
import { termsOfService } from "@/content/legal/legal";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: termsOfService.title,
  description: termsOfService.description,
  path: "/terms",
});

export default function TermsPage() {
  return <LegalPage doc={termsOfService} />;
}
