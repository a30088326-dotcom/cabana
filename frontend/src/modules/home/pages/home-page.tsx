import { getCabanas, getSite } from "@/shared/lib/data";
import { ArrivalSection } from "../components/arrival-section";
import { CabanaCollectionSection } from "../components/cabana-collection-section";
import { ExperiencesSection } from "../components/experiences-section";
import { GallerySection } from "../components/gallery-section";
import { HeroSection } from "../components/hero-section";
import { NatureSection } from "../components/nature-section";
import { RetreatValues } from "../components/retreat-values";
import { StaySearchSection } from "../components/stay-search-section";
import { StorySection } from "../components/story-section";
export default async function Home() {
  const [site, cabanas] = await Promise.all([getSite(), getCabanas()]);
  return (
    <main id="main">
      <HeroSection site={site} cabanas={cabanas} />
      <StaySearchSection />
      <StorySection site={site} />
      <RetreatValues />
      <CabanaCollectionSection cabanas={cabanas} />
      <ExperiencesSection />
      <NatureSection />
      <GallerySection site={site} />
      <ArrivalSection site={site} />
    </main>
  );
}
