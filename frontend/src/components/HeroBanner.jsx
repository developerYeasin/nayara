import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogoMark } from './Logo.jsx';
import { hero } from '../data/home.js';

const EASE = [0.22, 1, 0.36, 1];

export default function HeroBanner() {
  return (
    <section aria-label="nayara" className="relative h-[calc(100svh-108px)] min-h-[480px] overflow-hidden bg-[#4a4239]">
      <Link to={hero.to} aria-label={`${hero.title}: ${hero.subtitle}`} className="block h-full">
        <motion.img
          src={hero.image}
          alt={hero.alt}
          className="h-full w-full object-cover saturate-[.7]"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.8, ease: EASE }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#3a332b]/35 via-[#3a332b]/40 to-[#2a241e]/75" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-10 text-white md:px-10 md:pb-14">
          <motion.div
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: 1.6, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          >
            <LogoMark className="w-full max-w-[860px]" />
          </motion.div>
          <motion.div
            className="mt-6 flex items-end justify-between gap-6 border-t border-white/40 pt-4"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: EASE }}
          >
            <h1 className="font-sans text-[11px] uppercase tracking-label">{hero.title}</h1>
            <p className="text-right text-base font-light italic">{hero.subtitle}</p>
          </motion.div>
        </div>
      </Link>
    </section>
  );
}
