const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:4100/api').replace(/\/$/, '');
const cache = new Map();

export const readCache = (path) => cache.get(path);

export async function apiGet(path) {
  if (cache.has(path)) return cache.get(path);
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    const error = new Error(`Request failed (${response.status})`);
    error.status = response.status;
    throw error;
  }
  const data = await response.json();
  cache.set(path, data);
  return data;
}
