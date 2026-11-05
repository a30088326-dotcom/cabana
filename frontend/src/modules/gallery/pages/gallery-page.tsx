import { GalleryGrid } from "@/modules/gallery/components/gallery-grid";
import { getSite } from "@/shared/lib/data";
export const metadata = { title: "The gallery" };
export default async function Gallery() {
  const site = await getSite();
  return (
    <main id="main" className="inner-page">
      <section className="page-intro section-wrap">
        <p className="eyebrow">THE BEAUTY IS IN THE SMALL THINGS</p>
        <h1>
          Stay a little.
          <br />
          <em>Look a little closer.</em>
        </h1>
        <p>
          Cabana concepts and real moments from Sri Lanka.
          <br />
          Open any frame to explore its story and photo credit.
        </p>
      </section>
      <section className="section-wrap gallery-page">
        <GalleryGrid items={site.gallery} />
      </section>
    </main>
  );
}
