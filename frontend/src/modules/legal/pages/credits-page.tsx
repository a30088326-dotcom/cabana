import { legalLabels } from "@/modules/legal/config/labels";
import Link from "next/link";
export const metadata = { title: "Photo credits" };
export default function Credits() {
  return (
    <main id="main" className="inner-page legal-page section-wrap">
      <p className="eyebrow">THE PLACES THAT INSPIRED US</p>
      <h1>Photo credits</h1>
      <p>
        This local design concept combines original AI architectural imagery
        with reference photography of real Sri Lankan places. Reference images
        retain the rights of their respective owners.
      </p>
      <h2>Sri Lankan reference photography</h2>
      <p>
        Pool and landscape:{" "}
        <a
          href="https://www.bogalavillageecoresort.com/"
          target="_blank"
          rel="noreferrer"
        >
          {legalLabels.bogalaVillageEcoResortSriLanka}
        </a>
        .
      </p>
      <p>
        Tree-house:{" "}
        <a
          href="https://www.backofbeyond.lk/locations/jungle-hideaway-pidurangala/"
          target="_blank"
          rel="noreferrer"
        >
          {legalLabels.backOfBeyondJungleHideawayPidurangala}
        </a>
        .
      </p>
      <h2>Original concept imagery</h2>
      <p>
        Forest cabana exterior, cabana interior, pool hideaway and breakfast
        terrace were generated using OpenAI Imagegen for this design. These are
        architectural visualisations, not photographs of a real property.
      </p>
      <p>
        <Link href="/gallery">{legalLabels.exploreTheGalleryundefined}</Link>
      </p>
    </main>
  );
}
