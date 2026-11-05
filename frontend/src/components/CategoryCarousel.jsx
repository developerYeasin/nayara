import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { CategoryIcon } from './icons.jsx';
import { useSite } from '../context/SiteContext.jsx';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function CategoryCarousel() {
  const { categories } = useSite();
  const [plugins] = useState(() => (reducedMotion() ? [] : [Autoplay({ delay: 3500, stopOnInteraction: false })]));
  const [viewportRef, embla] = useEmblaCarousel({ loop: true, align: 'start', duration: 40 }, plugins);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!embla) return undefined;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    embla.on('select', onSelect);
    return () => embla.off('select', onSelect);
  }, [embla]);

  useEffect(() => { embla?.reInit(); }, [embla, categories.length]);

  return (
    <section aria-label="Shop by category" className="mx-auto max-w-7xl py-12 md:py-20">
      <div ref={viewportRef} className="overflow-hidden">
        <div className="flex">
          {categories.map((category) => (
            <Link key={category.slug} to={`/category/${category.slug}`} className="flex min-w-0 flex-[0_0_50%] flex-col items-center md:flex-[0_0_25%] lg:flex-[0_0_20%]">
              <CategoryIcon slug={category.slug} className="h-24 w-24 md:h-28 md:w-28" />
              <span className="mt-4 text-xs uppercase tracking-[0.04em]">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        {categories.map((category, index) => (
          <button
            key={category.slug}
            type="button"
            aria-label={`Show ${category.name}`}
            aria-current={index === selected}
            onClick={() => embla?.scrollTo(index)}
            className="flex h-6 w-[18px] items-center justify-center"
          >
            <span className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${index === selected ? 'bg-ink' : 'bg-line'}`} />
          </button>
        ))}
      </div>
    </section>
  );
}
