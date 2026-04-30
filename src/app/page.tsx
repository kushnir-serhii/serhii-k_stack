import { ProjectsList } from "@/components/ProjectsList";
import { Hero } from "@/components/Hero";
import { ServicesList } from "@/components/ServicesList";
import { ClockContactsSection } from "@/components/ClockContactSection";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between gap-24 lg:gap-[144px] pt-16 pb-36">
      <Hero />
      <ProjectsList />
      <ServicesList />
      <ClockContactsSection />
    </div>
  );
}
