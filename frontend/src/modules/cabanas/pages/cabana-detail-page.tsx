import { ReserveButton } from "@/modules/booking";
import { cabanasLabels } from "@/modules/cabanas/config/labels";
import { getCabanas } from "@/shared/lib/data";
import { money } from "@/shared/lib/format";
import { ArrowLeft, Check, Maximize2, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = (await getCabanas()).find((c) => c.id === slug);
  return { title: c?.name || "Cabana not found", description: c?.description };
}
export default async function CabanaDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = (await getCabanas()).find((c) => c.id === slug);
  if (!c) notFound();
  return (
    <main id="main" className="inner-page">
      <div className="detail-heading section-wrap">
        <Link className="text-link" href="/cabanas">
          <ArrowLeft size={15} />
          {cabanasLabels.allCabanas}
        </Link>
        <p className="eyebrow">{c.tag}</p>
        <h1>{c.name}</h1>
        <p>{c.category}</p>
      </div>
      <div className="detail-image">
        <Image
          src={c.image}
          alt={c.name + " architectural visualisation"}
          fill
          priority
          sizes="100vw"
        />
      </div>
      <section className="detail-body section-wrap">
        <div>
          <p className="eyebrow">SIMPLE PLEASURES. THOUGHTFUL DETAILS.</p>
          <h2>
            Settle into
            <br />
            <em>your own rhythm.</em>
          </h2>
          <p>{c.description}</p>
          <div className="detail-specs">
            <span>
              <Users size={18} />
              Up to {c.capacity} guests
            </span>
            <span>
              <Maximize2 size={18} />
              {c.area} m² of space
            </span>
          </div>
          <h3>Your comforts, considered.</h3>
          <ul className="amenities">
            {c.amenities.map((a) => (
              <li key={a}>
                <Check size={16} />
                {a}
              </li>
            ))}
          </ul>
        </div>
        <aside className="reservation-card">
          <p className="eyebrow">MAKE THIS YOUR HIDEAWAY</p>
          <h3>
            LKR {money(c.price)}
            <small> / night</small>
          </h3>
          <p>
            Indicative rate. Final pricing and availability are confirmed with
            your enquiry.
          </p>
          <ReserveButton cabanaId={c.id} className="button full">
            {cabanasLabels.enquireAboutThisStay}
          </ReserveButton>
          <p className="form-footnote">No payment required to enquire.</p>
        </aside>
      </section>
    </main>
  );
}
