import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import FadeImage from './FadeImage.jsx';
import { useSite } from '../context/SiteContext.jsx';
import { categoryPhotos } from '../data/home.js';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function CategoryCarousel() {
  const { categories } = useSite();
  const [plugins] = useState(() => (reducedMotion() ? [] : [Autoplay({ delay: 3800, stopOnInteraction: false })]));
  const [viewportRef, embla] = useEmblaCarousel({ loop: true, align: 'start', duration: 45 }, plugins);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!embla) return undefined;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    embla.on('select', onSelect);
    return () => embla.off('select', onSelect);
  }, [embla]);

  useEffect(() => { embla?.reInit(); }, [embla, categories.length]);

  return (
    <section aria-labelledby="categories-heading" className="mx-auto max-w-7xl pb-16 md:pb-24">
      <h2 id="categories-heading" className="mb-7 px-4 font-sans text-[10px] uppercase tracking-label text-muted md:px-6">Shop by category</h2>
      <div ref={viewportRef} className="overflow-hidden pl-4 md:pl-6">
        <div className="flex">
          {categories.map((category, index) => (
            <Link key={category.slug} to={`/category/${category.slug}`} className="group min-w-0 flex-[0_0_62%] pr-3 md:flex-[0_0_25%] lg:flex-[0_0_20%]">
              <div className="aspect-[3/4] overflow-hidden bg-warm">
                <FadeImage src={categoryPhotos[category.slug]} alt="" className="h-full w-full object-cover saturate-[.8] group-hover:scale-105" />
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-lg font-light">{category.name}</span>
                <span className="font-sans text-[10px] text-muted">{String(index + 1).padStart(2, '0')}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        {categories.map((category, index) => (
          <button
            key={category.slug}
            type="button"
            aria-label={`Show ${category.name}`}
            aria-current={index === selected}
            onClick={() => embla?.scrollTo(index)}
            className="flex h-6 w-[18px] items-center justify-center"
          >
            <span className={`h-1 w-1 rounded-full transition-colors duration-500 ${index === selected ? 'bg-ink' : 'bg-[#cfcbc4]'}`} />
          </button>
        ))}
      </div>
    </section>
  );
}
