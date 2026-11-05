import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShoppingBag } from 'lucide-react';
import Logo from './Logo.jsx';
import SideDrawer from './SideDrawer.jsx';
import { WhatsAppIcon } from './icons.jsx';
import { useSite } from '../context/SiteContext.jsx';
import { useInquiryList } from '../context/InquiryContext.jsx';
import { whatsappUrl } from '../lib/whatsapp.js';

const iconButton = 'flex h-10 w-10 items-center justify-center text-ink';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { settings } = useSite();
  const { items } = useInquiryList();

  return (
    <>
      <header className="sticky top-0 z-30 bg-white">
        <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-2 md:px-6">
          <button type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)} className={iconButton}>
            <Menu className="h-5 w-5" strokeWidth={1} />
          </button>
          <Logo />
          <div className="flex justify-end">
            <a href={whatsappUrl(settings.whatsapp_number)} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className={iconButton}>
              <WhatsAppIcon />
            </a>
            <Link to="/inquiry-list" aria-label={`Inquiry list, ${items.length} items`} className={`${iconButton} relative`}>
              <ShoppingBag className="h-5 w-5" strokeWidth={1} />
              {items.length > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center bg-charcoal font-sans text-[9px] text-white">
                  {items.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>
      <SideDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
