import { Link } from 'react-router-dom';
import FadeImage from './FadeImage.jsx';

export default function SectionBanner({ title, subtitle, to, image, alt, eager = false, className = 'h-[45vh] md:h-[60vh]' }) {
  return (
    <Link to={to} className={`group relative block overflow-hidden ${className}`}>
      <FadeImage src={image} alt={alt} eager={eager} className="h-full w-full object-cover duration-[1600ms] group-hover:scale-105" />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
        <h2 className="text-xl font-light uppercase tracking-[0.25em] md:text-3xl">{title}</h2>
        <p className="mt-2 border-b border-white/70 pb-0.5 text-[10px] uppercase tracking-[0.25em]">{subtitle}</p>
      </div>
    </Link>
  );
}
