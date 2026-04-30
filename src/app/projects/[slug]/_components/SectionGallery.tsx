import Image from "next/image";
import { SectionHeader } from "./SectionHeader";

type Props = {
  sectionRef: (el: HTMLElement | null) => void;
  imgSrcArr: string[];
  title: string;
};

export function SectionGallery({ sectionRef, imgSrcArr, title }: Props) {
  return (
    <section ref={sectionRef} id="gallery">
      <SectionHeader num="05" title="Gallery" />
      <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
        {imgSrcArr.map((src, i) => (
          <div
            key={src}
            className={`relative overflow-hidden rounded-lg border border-grey_300${i === 0 ? " col-span-full" : ""}`}
          >
            <Image
              src={src}
              alt={`${title} screenshot ${i + 1}`}
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
