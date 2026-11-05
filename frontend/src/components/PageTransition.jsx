import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import VerticalText from './VerticalText.jsx';
import { apiGet } from '../lib/api.js';

const EASE = [0.76, 0, 0.24, 1];
const DURATION = 1.1;
const TransitionContext = createContext(null);

const wait = (ms) => new Promise((resolve) => { setTimeout(resolve, ms); });

// Maps the tapped thumbnail onto the area the detail page's main image occupies.
function flightPath(rect) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const targetWidth = Math.min(vw - 32, 900);
  const targetHeight = vh * 0.55;
  const scale = Math.min(targetWidth / rect.width, targetHeight / rect.height);
  const top = 64 + (document.querySelector('form[role="search"]')?.offsetHeight ?? 44);
  return {
    scale,
    x: vw / 2 - (rect.left + rect.width / 2),
    y: top + targetHeight / 2 - (rect.top + rect.height / 2),
  };
}

export const useProductTransition = () => useContext(TransitionContext);

export default function PageTransition({ children }) {
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const busy = useRef(false);

  const open = useCallback(async (product, imageEl) => {
    const path = `/product/${product.slug}`;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (busy.current) return;
    if (reduced || !imageEl) {
      navigate(path);
      return;
    }
    busy.current = true;
    const rect = imageEl.getBoundingClientRect();
    setFlight({ product, rect, path: flightPath(rect) });
    // Load the detail data during the flight so the page appears complete underneath.
    await Promise.all([wait(DURATION * 1000), apiGet(`/products/${product.slug}`).catch(() => null)]);
    navigate(path);
    await wait(350);
    setFlight(null);
    busy.current = false;
  }, [navigate]);

  return (
    <TransitionContext.Provider value={open}>
      {children}
      <AnimatePresence>
        {flight && (
          <motion.div
            className="fixed inset-0 z-[60] overflow-hidden bg-white"
            style={{ perspective: 1200 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <VerticalText text={flight.product.name} />
            <motion.img
              src={flight.product.image}
              alt=""
              className="fixed object-contain"
              style={{ left: flight.rect.left, top: flight.rect.top, width: flight.rect.width, height: flight.rect.height }}
              initial={{ x: 0, y: 0, scale: 1, rotate: 0, rotateY: 0 }}
              animate={{
                x: [0, flight.path.x * 0.15, flight.path.x],
                y: [0, Math.max(flight.path.y * 0.2, 30), flight.path.y],
                scale: [1, flight.path.scale * 0.8, flight.path.scale],
                rotate: [0, -5, 0],
                rotateY: [0, -14, 0],
              }}
              transition={{ duration: DURATION, ease: EASE, times: [0, 0.45, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
