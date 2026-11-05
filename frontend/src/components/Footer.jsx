import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import { useSite } from '../context/SiteContext.jsx';

const link = 'text-[10px] uppercase tracking-label text-white/70 transition-colors hover:text-white';

export default function Footer() {
  const { categories, settings } = useSite();
  return (
    <footer className="border-t border-white/10 bg-charcoal px-6 py-14 text-center">
      <Logo light className="w-[120px]" />
      <nav aria-label="Footer" className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-x-6 gap-y-3">
        {categories.slice(0, 6).map((c) => <Link key={c.slug} to={`/category/${c.slug}`} className={link}>{c.name}</Link>)}
      </nav>
      {(settings.instagram_url || settings.facebook_url) && (
        <div className="mt-6 flex justify-center gap-6">
          {settings.instagram_url && <a href={settings.instagram_url} target="_blank" rel="noreferrer" className={link}>Instagram</a>}
          {settings.facebook_url && <a href={settings.facebook_url} target="_blank" rel="noreferrer" className={link}>Facebook</a>}
        </div>
      )}
      <p className="mt-8 font-sans text-[10px] text-white/50">© {new Date().getFullYear()} nayara</p>
    </footer>
  );
}
