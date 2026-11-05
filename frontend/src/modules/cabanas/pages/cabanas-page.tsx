import { CabanaCard } from "@/modules/cabanas/components/cabana-card";
import { getCabanas } from "@/shared/lib/data";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Our cabanas" };
export default async function Cabanas() {
  const cabanas = await getCabanas();
  return (
    <main id="main" className="inner-page">
      <section className="page-intro section-wrap">
        <p className="eyebrow">YOUR OWN CORNER OF QUIET</p>
        <h1>
          Stay close
          <br />
          to <em>nature.</em>
        </h1>
        <p>
          Thoughtful spaces, natural textures, and a slower rhythm.
          <br />
          Find the hideaway that feels like you.
        </p>
      </section>
      <section className="section-wrap collection">
        <div className="cabana-grid">
          {cabanas.map((c, i) => (
            <CabanaCard cabana={c} key={c.id} index={i} />
          ))}
        </div>
        <p className="collection-note">
          Rates shown are indicative sample rates. Send an enquiry for confirmed
          availability and pricing.
        </p>
      </section>
    </main>
  );
}
