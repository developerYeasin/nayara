import HeroBanner from '../components/HeroBanner.jsx';
import CategoryCarousel from '../components/CategoryCarousel.jsx';
import SectionBanner from '../components/SectionBanner.jsx';
import ConsultationCTA from '../components/ConsultationCTA.jsx';
import Reveal from '../components/Reveal.jsx';
import FadeImage from '../components/FadeImage.jsx';
import { bestSelling, moodboard } from '../data/home.js';
import { useTitle } from '../hooks/useTitle.js';

export default function Home() {
  useTitle();
  return (
    <>
      <HeroBanner />
      <CategoryCarousel />
      <Reveal><SectionBanner {...bestSelling} className="h-[50vh] md:h-[75vh]" /></Reveal>
      <ConsultationCTA />
      <section aria-label="Interior inspiration" className="mx-auto grid max-w-7xl grid-cols-2 gap-2 p-2 md:grid-cols-4 md:gap-4 md:p-4">
        {moodboard.map((item) => (
          <Reveal key={item.image} className="aspect-square">
            <FadeImage src={item.image} alt={item.alt} className="h-full w-full object-cover" />
          </Reveal>
        ))}
      </section>
    </>
  );
}
