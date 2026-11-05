import { useSite } from '../context/SiteContext.jsx';
import { whatsappUrl } from '../lib/whatsapp.js';

export default function InquireButton({ productName, message, label = 'Inquire Now' }) {
  const { settings } = useSite();
  const text = message ?? `I'm interested in ${productName}`;
  return (
    <a
      href={whatsappUrl(settings.whatsapp_number, text)}
      target="_blank"
      rel="noreferrer"
      className="block bg-charcoal py-3.5 text-center font-sans text-[10px] uppercase tracking-label text-white transition-colors duration-300 hover:bg-black"
    >
      {label}
    </a>
  );
}
