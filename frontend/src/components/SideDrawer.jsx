import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import Logo from './Logo.jsx';
import { useSite } from '../context/SiteContext.jsx';

const EASE = [0.76, 0, 0.24, 1];

export default function SideDrawer({ open, onClose }) {
  const { categories } = useSite();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/30"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
          />
          <motion.nav
            role="dialog" aria-modal="true" aria-label="Shop categories"
            className="fixed inset-y-0 left-0 z-50 flex w-[82%] max-w-sm flex-col overflow-y-auto bg-white px-6 py-5"
            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="mb-8 flex items-center justify-between">
              <Logo onClick={onClose} />
              <button ref={closeRef} type="button" aria-label="Close menu" onClick={onClose} className="flex h-10 w-10 items-center justify-center">
                <X className="h-5 w-5" strokeWidth={1} />
              </button>
            </div>
            <ul>
              {categories.map((category) => (
                <li key={category.slug} className="border-b border-line">
                  <Link to={`/category/${category.slug}`} onClick={onClose} className="block py-3.5 text-sm uppercase tracking-label">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
