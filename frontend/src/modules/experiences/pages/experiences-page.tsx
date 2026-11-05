import { ReserveButton } from "@/modules/booking";
import { ExperienceList } from "@/modules/experiences/components/experience-list";
import { experiencesLabels } from "@/modules/experiences/config/labels";
export const metadata = { title: "Experiences" };
export default function Experiences() {
  return (
    <main id="main" className="inner-page">
      <section className="page-intro section-wrap">
        <p className="eyebrow">LESS TO DO. MORE TO DISCOVER.</p>
        <h1>
          The days
          <br />
          are <em>yours.</em>
        </h1>
        <p>
          A morning beneath the trees, a long lunch, an afternoon with no plans.
          <br />
          Discover a gentler way to spend your time.
        </p>
      </section>
      <section className="section-wrap experience-page">
        <ExperienceList />
      </section>
      <section className="experience-callout section-wrap">
        <h2>
          Something special
          <br />
          <em>in mind?</em>
        </h2>
        <p>
          A quiet celebration, a longer escape or a table for two.
          <br />
          Share your plans when you enquire.
        </p>
        <ReserveButton>{experiencesLabels.letsPlanYourStay}</ReserveButton>
      </section>
    </main>
  );
}
