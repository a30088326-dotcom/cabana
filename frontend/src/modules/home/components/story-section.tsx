import { BrandMark } from "@/shared/components/brand";
import type { SiteSettings } from "@elara/contracts";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
export function StorySection({ site }: { site: SiteSettings }) {
  return (
    <section id="story" className="story-section section-wrap">
      <div className="story-label">
        <p className="eyebrow">WELCOME TO {site.name}</p>
        <span className="section-index">01 — THE RETREAT</span>
        <BrandMark className="story-mark" />
      </div>
      <div className="story-content">
        <h2>
          Less hurry.
          <br />
          More <em>here.</em>
        </h2>
        <div className="story-bottom">
          <p>{site.story}</p>
          <Link
            className="circle-link"
            href="/experiences"
            aria-label="Discover life at the retreat"
          >
            <ArrowUpRight size={26} />
          </Link>
        </div>
      </div>
    </section>
  );
}
