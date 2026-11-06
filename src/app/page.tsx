import type { Metadata } from "next";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, pageMetadata } from "@/lib/seo";
import { ProjectsList } from "@/components/ProjectsList";
import { Hero } from "@/components/Hero";
import { ServicesList } from "@/components/ServicesList";
import { ClockContactsSection } from "@/components/ClockContactSection";

export const metadata: Metadata = {
  ...pageMetadata({ title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, path: "/" }),
  // Home uses the full title, not the "%s · Serhii Kushnir" template.
  title: { absolute: DEFAULT_TITLE },
};

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between gap-24 lg:gap-[144px] pt-16 pb-36">
      <Hero />
      <ProjectsList />
      <ServicesList />
      <ClockContactsSection />
    </main>
  );
}
