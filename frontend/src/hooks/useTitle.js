import { useEffect } from 'react';

export function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | nayara` : 'nayara | modern furniture & home decor';
  }, [title]);
}
