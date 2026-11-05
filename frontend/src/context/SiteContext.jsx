import { createContext, useContext, useEffect, useMemo } from 'react';
import { useApi } from '../hooks/useApi.js';

const SiteContext = createContext(null);

export function SiteProvider({ children }) {
  const settings = useApi('/settings');
  const categories = useApi('/categories');

  // Menus depend on this data, so recover by itself if the API was briefly unavailable.
  useEffect(() => {
    if (!settings.error && !categories.error) return undefined;
    const timer = setTimeout(() => {
      if (settings.error) settings.retry();
      if (categories.error) categories.retry();
    }, 4000);
    return () => clearTimeout(timer);
  }, [settings.error, categories.error, settings.retry, categories.retry]);

  const value = useMemo(() => ({
    settings: settings.data ?? {},
    categories: categories.data ?? [],
    categoriesLoading: categories.loading,
  }), [settings.data, categories.data, categories.loading]);
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export const useSite = () => useContext(SiteContext);
