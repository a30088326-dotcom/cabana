import { homeLabels } from "@/modules/home/config/labels";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export function NatureSection() {
  return (
    <section className="quiet-interlude">
      <Image
        src="/images/sri-lanka-pool.webp"
        alt="Real Sri Lankan landscape at Bogala Village Eco Resort, reference photograph"
        fill
        sizes="100vw"
      />
      <div />
      <p className="eyebrow">THE BEAUTY OF SRI LANKA</p>
      <h2>
        Let the outside
        <br />
        <em>in.</em>
      </h2>
      <Link href="/gallery" className="hero-link">
        {homeLabels.findYourInspiration}
        <ArrowUpRight size={18} />
      </Link>
    </section>
  );
}
