import { GalleryGrid } from "@/modules/gallery/components/gallery-grid";
import { homeLabels } from "@/modules/home/config/labels";
import type { SiteSettings } from "@elara/contracts";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
export function GallerySection({ site }: { site: SiteSettings }) {
  return (
    <section className="gallery-section section-wrap">
      <div className="section-heading">
        <div>
          <p className="eyebrow">A FEELING, IN FRAMES</p>
          <h2>
            Little moments.
            <br />
            <em>Lasting memories.</em>
          </h2>
        </div>
        <Link href="/gallery" className="text-link">
          {homeLabels.stepInsideTheGallery}
          <ArrowUpRight size={17} />
        </Link>
      </div>
      <GalleryGrid items={site.gallery.slice(0, 4)} compact />
    </section>
  );
}
