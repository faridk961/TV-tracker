import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Ctx = createContext(null);
export const useStore = () => useContext(Ctx);

// list: [{id, name, poster_path}], seen: { "showId:season:episode": true }
export function StoreProvider({ children }) {
  const [list, setList] = useState([]);
  const [seen, setSeen] = useState({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.multiGet(['w', 's'])
      .then(([[, w], [, s]]) => { if (w) setList(JSON.parse(w)); if (s) setSeen(JSON.parse(s)); })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (ready) AsyncStorage.multiSet([['w', JSON.stringify(list)], ['s', JSON.stringify(seen)]]).catch(() => {});
  }, [list, seen, ready]);

  const has = (id) => list.some((x) => x.id === id);
  const toggle = (show) => setList((l) => (l.some((x) => x.id === show.id) ? l.filter((x) => x.id !== show.id) : [...l, show]));
  const toggleSeen = (key) => setSeen((o) => { const n = { ...o }; if (n[key]) delete n[key]; else n[key] = true; return n; });

  return <Ctx.Provider value={{ list, seen, has, toggle, toggleSeen }}>{children}</Ctx.Provider>;
}
