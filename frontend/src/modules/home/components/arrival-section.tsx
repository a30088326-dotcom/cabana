import { homeLabels } from "@/modules/home/config/labels";
import type { SiteSettings } from "@elara/contracts";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
export function ArrivalSection({ site }: { site: SiteSettings }) {
  return (
    <section className="arrival-section section-wrap">
      <div>
        <p className="eyebrow">CLOSER THAN YOU THINK</p>
        <h2>
          A change of scenery.
          <br />
          <em>A change of pace.</em>
        </h2>
        <p>
          Some journeys bring you somewhere new.
          <br />
          The best ones bring you back to yourself.
        </p>
      </div>
      <Link href="/contact" className="arrival-link">
        <span>{site.location}</span>
        <span>
          {homeLabels.planYourJourney}
          <ArrowUpRight size={22} />
        </span>
      </Link>
    </section>
  );
}
