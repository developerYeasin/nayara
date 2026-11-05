import { Link } from 'react-router-dom';
import FadeImage from './FadeImage.jsx';

export default function SectionBanner({ title, subtitle, to, image, alt, className = 'h-[70vh]' }) {
  return (
    <Link to={to} className={`group relative block overflow-hidden bg-warm ${className}`}>
      <FadeImage src={image} alt={alt} className="h-full w-full object-cover saturate-[.75] duration-[1600ms] group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2a241e]/65 via-transparent to-transparent" />
      <div className="absolute inset-x-5 bottom-7 flex items-end justify-between gap-6 text-white md:inset-x-10 md:bottom-10">
        <h2 className="max-w-[12ch] text-4xl font-light leading-[1.02] md:text-6xl">{title}</h2>
        <span className="shrink-0 border-b border-white/70 pb-1 font-sans text-[10px] uppercase tracking-label">{subtitle}</span>
      </div>
    </Link>
  );
}
