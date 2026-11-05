import { motion } from 'framer-motion';

export default function VerticalText({ text }) {
  const letters = text.toUpperCase().split('');
  return (
    <div aria-hidden="true" className="fixed left-3 top-1/2 z-[2] flex -translate-y-1/2 gap-2.5 text-white mix-blend-difference">
      <div className="flex flex-col items-center font-sans text-[9px] leading-[1.35]">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="min-h-[6px]"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.018 }}
          >
            {letter === ' ' ? '' : letter}
          </motion.span>
        ))}
      </div>
      <motion.span
        className="w-px origin-top bg-white/70"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />
    </div>
  );
}
