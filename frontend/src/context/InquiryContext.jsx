import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const KEY = 'nayara-inquiry-list';
const InquiryContext = createContext(null);

const load = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export function InquiryProvider({ children }) {
  const [items, setItems] = useState(load);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* storage unavailable */ }
  }, [items]);

  const toggle = useCallback((product) => {
    setItems((list) => (list.some((i) => i.slug === product.slug)
      ? list.filter((i) => i.slug !== product.slug)
      : [...list, { slug: product.slug, name: product.name, image: product.image }]));
  }, []);

  const value = useMemo(() => ({ items, toggle, has: (slug) => items.some((i) => i.slug === slug) }), [items, toggle]);
  return <InquiryContext.Provider value={value}>{children}</InquiryContext.Provider>;
}

export const useInquiryList = () => useContext(InquiryContext);
