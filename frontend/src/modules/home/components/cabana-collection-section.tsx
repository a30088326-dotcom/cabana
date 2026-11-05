import { CabanaCard } from "@/modules/cabanas/components/cabana-card";
import { homeLabels } from "@/modules/home/config/labels";
import type { Cabana } from "@elara/contracts";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
export function CabanaCollectionSection({ cabanas }: { cabanas: Cabana[] }) {
  return (
    <section className="cabanas-section section-wrap" id="cabanas">
      <div className="section-heading">
        <div>
          <p className="eyebrow">SPACES TO SWITCH OFF</p>
          <h2>
            A hideaway,
            <br />
            <em>all your own.</em>
          </h2>
        </div>
        <div>
          <p>
            Natural textures. Open horizons.
            <br />A quiet place to come back to yourself.
          </p>
          <Link href="/cabanas" className="text-link">
            {homeLabels.exploreAllCabanas}
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
      <div className="cabana-grid">
        {cabanas.map((cabana, i) => (
          <CabanaCard key={cabana.id} cabana={cabana} index={i} />
        ))}
      </div>
    </section>
  );
}
