import { useSite } from '../context/SiteContext.jsx';
import { whatsappUrl } from '../lib/whatsapp.js';

export default function ConsultationCTA() {
  const { settings } = useSite();
  return (
    <section className="bg-charcoal px-6 py-20 text-center text-white md:py-24">
      <p className="text-sm font-light italic text-white/70">Need furniture-related guidance?</p>
      <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-light leading-[1.08] md:text-6xl">
        Request A Free Consultation And Price Estimate
      </h2>
      <a
        href={whatsappUrl(settings.whatsapp_number, 'Hello, I would like a free consultation and price estimate.')}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-block rounded-full border border-white/70 px-8 py-3 font-sans text-[10px] uppercase tracking-label transition-colors duration-500 hover:bg-white hover:text-ink"
      >
        Contact Us
      </a>
    </section>
  );
}
