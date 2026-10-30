const KEY = process.env.EXPO_PUBLIC_TMDB_KEY;
const BASE = 'https://api.themoviedb.org/3';

export const img = (p, size = 'w342') => (p ? `https://image.tmdb.org/t/p/${size}${p}` : null);

async function get(path, params = {}) {
  if (!KEY) throw new Error('Missing EXPO_PUBLIC_TMDB_KEY. Copy .env.example to .env and add your TMDB key.');
  const qs = new URLSearchParams({ api_key: KEY, language: 'en-US', ...params });
  const r = await fetch(`${BASE}${path}?${qs}`);
  if (!r.ok) throw new Error(`TMDB error ${r.status}`);
  return r.json();
}

export const genres = () => get('/genre/tv/list').then((r) => r.genres);
export const searchTv = (q) => get('/search/tv', { query: q }).then((r) => r.results);
export const discoverTv = (g) =>
  (g.length ? get('/discover/tv', { with_genres: g.join(','), sort_by: 'popularity.desc' }) : get('/tv/popular')).then((r) => r.results);
export const tv = (id, extra) => get(`/tv/${id}`, extra ? { append_to_response: extra } : {});
export const season = (id, n) => get(`/tv/${id}/season/${n}`);
export const person = (id) => get(`/person/${id}`, { append_to_response: 'combined_credits' });
