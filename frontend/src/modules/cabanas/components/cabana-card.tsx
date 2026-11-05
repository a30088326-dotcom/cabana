import { money } from "@/shared/lib/format";
import type { Cabana } from "@elara/contracts";
import { ArrowUpRight, Maximize2, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export function CabanaCard({
  cabana,
  index = 0,
}: {
  cabana: Cabana;
  index?: number;
}) {
  return (
    <article className="cabana-card">
      <Link
        className="cabana-image"
        href={"/cabanas/" + cabana.id}
        aria-label={"Discover " + cabana.name}
      >
        <Image
          src={cabana.image}
          alt={cabana.name + " — illustrative cabana visual"}
          fill
          sizes="(max-width:700px) 100vw, (max-width:1100px) 50vw, 33vw"
        />
        <span className="image-tag">{cabana.tag}</span>
        <span className="image-arrow">
          <ArrowUpRight size={24} />
        </span>
      </Link>
      <div className="cabana-meta">
        <span>0{index + 1} / YOUR PRIVATE ESCAPE</span>
        <span>
          <Users size={13} />
          {cabana.capacity}
          <i />
          <Maximize2 size={12} />
          {cabana.area} m²
        </span>
      </div>
      <Link href={"/cabanas/" + cabana.id}>
        <h3>{cabana.name}</h3>
      </Link>
      <p>{cabana.category}</p>
      <div className="cabana-bottom">
        <span>
          From <strong>LKR {money(cabana.price)}</strong>
          <small> / night · indicative</small>
        </span>
        <Link href={"/cabanas/" + cabana.id} aria-label={"View " + cabana.name}>
          <ArrowUpRight size={20} />
        </Link>
      </div>
    </article>
  );
}
