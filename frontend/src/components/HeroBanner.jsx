import SectionBanner from './SectionBanner.jsx';
import { heroBanners } from '../data/home.js';

export default function HeroBanner() {
  return (
    <section aria-label="Featured collections" className="md:grid md:grid-cols-2">
      {heroBanners.map((banner) => <SectionBanner key={banner.title} {...banner} eager />)}
    </section>
  );
}
