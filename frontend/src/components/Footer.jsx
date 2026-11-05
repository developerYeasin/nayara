import { Link } from 'react-router-dom';
import { LogoMark } from './Logo.jsx';
import { useSite } from '../context/SiteContext.jsx';
import { whatsappUrl } from '../lib/whatsapp.js';

const link = 'block py-1 text-base font-light text-white/75 transition-colors hover:text-white';
const heading = 'mb-3 font-sans text-[10px] uppercase tracking-label text-white/50';

export default function Footer() {
  const { categories, settings } = useSite();
  return (
    <footer className="bg-charcoal px-5 pb-8 pt-14 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <nav aria-label="Shop">
            <h2 className={heading}>Shop</h2>
            {categories.slice(0, 6).map((c) => <Link key={c.slug} to={`/category/${c.slug}`} className={link}>{c.name}</Link>)}
          </nav>
          <nav aria-label="More categories">
            <h2 className={heading}>More</h2>
            {categories.slice(6).map((c) => <Link key={c.slug} to={`/category/${c.slug}`} className={link}>{c.name}</Link>)}
          </nav>
          <div>
            <h2 className={heading}>Contact</h2>
            <a href={whatsappUrl(settings.whatsapp_number)} target="_blank" rel="noreferrer" className={link}>WhatsApp</a>
            <Link to="/inquiry-list" className={link}>Inquiry List</Link>
            {settings.instagram_url && <a href={settings.instagram_url} target="_blank" rel="noreferrer" className={link}>Instagram</a>}
            {settings.facebook_url && <a href={settings.facebook_url} target="_blank" rel="noreferrer" className={link}>Facebook</a>}
          </div>
        </div>
        <LogoMark className="mt-14 w-full" />
        <div className="mt-6 flex justify-between font-sans text-[10px] uppercase tracking-[0.14em] text-white/50">
          <span>Modern furniture &amp; home decor</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
