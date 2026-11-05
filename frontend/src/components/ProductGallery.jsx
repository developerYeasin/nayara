import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const SWIPE_DISTANCE = 50;

export default function ProductGallery({ images }) {
  const [active, setActive] = useState(0);
  const image = images[active];
  if (!image) return null;

  const step = (direction) => setActive((i) => (i + direction + images.length) % images.length);

  return (
    <section aria-label="Product images">
      <div className="relative h-[55vh] overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.img
            key={image.url}
            src={image.url}
            alt={image.alt}
            draggable={false}
            className="absolute inset-0 h-full w-full touch-pan-y select-none object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            drag={images.length > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -SWIPE_DISTANCE) step(1);
              else if (info.offset.x > SWIPE_DISTANCE) step(-1);
            }}
          />
        </AnimatePresence>
      </div>
      <div className="mt-5 flex justify-center gap-1">
        {images.map((thumb, index) => (
          <button
            key={thumb.url}
            type="button"
            aria-label={`View image ${index + 1}`}
            aria-current={index === active}
            onClick={() => setActive(index)}
            className={`h-11 w-14 transition-opacity duration-500 ${index === active ? 'opacity-100' : 'opacity-60'}`}
          >
            <img src={thumb.url} alt="" loading="lazy" className="h-full w-full object-contain" />
          </button>
        ))}
      </div>
    </section>
  );
}
