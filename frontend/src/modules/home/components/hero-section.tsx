import { homeLabels } from "@/modules/home/config/labels";
import { BrandMark } from "@/shared/components/brand";
import type { Cabana, SiteSettings } from "@elara/contracts";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export function HeroSection({
  site,
  cabanas,
}: {
  site: SiteSettings;
  cabanas: Cabana[];
}) {
  return (
    <section className="hero">
      <Image
        src={site.hero}
        alt="A secluded timber cabana overlooking a tropical forest, architectural visualisation"
        fill
        priority
        sizes="100vw"
        className="hero-image"
      />
      <div className="hero-shade" />
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="tiny-line" />
          {site.location.toUpperCase()} · A SLOWER KIND OF STAY
        </p>
        <h1>
          {site.headline === "Somewhere to just be." ? (
            <>
              Somewhere
              <br />
              to <em>just be.</em>
            </>
          ) : (
            site.headline
          )}
        </h1>
        <p className="hero-subheading">{site.subheading}</p>
        <Link className="hero-link" href="/cabanas">
          {homeLabels.discoverYourHideaway}
          <ArrowUpRight size={19} />
        </Link>
      </div>
      <div className="hero-seal">
        <BrandMark />
        <span>
          ROOTED IN NATURE
          <br />
          MADE FOR STILLNESS
        </span>
      </div>
      <div className="hero-bottom">
        <a href="#story">
          <ArrowDown size={17} /> {homeLabels.aLittleFurtherFromOrdinary}
        </a>
        <span>THE KIND OF PLACE YOU FEEL.</span>
      </div>
    </section>
  );
}
