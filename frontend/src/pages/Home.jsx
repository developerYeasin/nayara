import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner.jsx';
import CategoryCarousel from '../components/CategoryCarousel.jsx';
import SectionBanner from '../components/SectionBanner.jsx';
import ConsultationCTA from '../components/ConsultationCTA.jsx';
import ProductCard from '../components/ProductCard.jsx';
import Reveal from '../components/Reveal.jsx';
import FadeImage from '../components/FadeImage.jsx';
import { bestSelling, moodboard, newArrivals } from '../data/home.js';
import { useApi } from '../hooks/useApi.js';
import { useTitle } from '../hooks/useTitle.js';

export default function Home() {
  useTitle();
  const { data } = useApi('/products?category=sofas&limit=6');

  return (
    <>
      <HeroBanner />
      <Reveal className="mx-auto max-w-3xl px-5 py-20 text-center md:py-32">
        <p className="text-[1.9rem] font-light leading-[1.18] md:text-5xl">
          Calm, considered furniture for rooms that feel like your own.
        </p>
      </Reveal>
      <CategoryCarousel />
      <Reveal><SectionBanner {...newArrivals} className="h-[62vh] md:h-[80vh]" /></Reveal>

      {data?.items.length > 0 && (
        <section aria-labelledby="selected-heading" className="mx-auto max-w-7xl py-16 md:py-24">
          <div className="mb-7 flex items-baseline justify-between px-4 md:px-6">
            <h2 id="selected-heading" className="text-3xl font-light">Selected Sofas</h2>
            <Link to="/category/sofas" className="border-b border-ink pb-0.5 font-sans text-[10px] uppercase tracking-label">View all</Link>
          </div>
          <div className="flex snap-x gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:px-6">
            {data.items.map((product) => (
              <ProductCard key={product.id} product={product} className="w-[62%] shrink-0 snap-start md:w-[28%] lg:w-[22%]" />
            ))}
          </div>
        </section>
      )}

      <Reveal><SectionBanner {...bestSelling} className="h-[62vh] md:h-[85vh]" /></Reveal>
      <ConsultationCTA />
      <section aria-label="Interior inspiration" className="mx-auto grid max-w-7xl grid-cols-12 gap-3 px-4 py-16 md:gap-4 md:px-6 md:py-24">
        {moodboard.map((item) => (
          <Reveal key={item.image} className={`overflow-hidden bg-warm ${item.span}`}>
            <FadeImage src={item.image} alt={item.alt} className="h-full w-full object-cover saturate-[.75]" />
          </Reveal>
        ))}
      </section>
    </>
  );
}
