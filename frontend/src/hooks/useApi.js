import { useCallback, useEffect, useState } from 'react';
import { apiGet, readCache } from '../lib/api.js';

export function useApi(path) {
  const [state, setState] = useState(() => ({ path, data: readCache(path) ?? null, error: null }));
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    const cached = readCache(path);
    setState({ path, data: cached ?? null, error: null });
    if (!cached) {
      apiGet(path)
        .then((data) => active && setState({ path, data, error: null }))
        .catch((error) => active && setState({ path, data: null, error }));
    }
    return () => { active = false; };
  }, [path, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  // Guards against one render of stale data right after the path changes.
  const current = state.path === path ? state : { data: readCache(path) ?? null, error: null };
  return { data: current.data, error: current.error, loading: !current.data && !current.error, retry };
}
