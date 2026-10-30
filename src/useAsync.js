import { useEffect, useState } from 'react';

// Runs fn whenever deps change; ignores results that arrive after a newer call.
export function useAsync(fn, deps) {
  const [st, set] = useState({});
  useEffect(() => {
    let live = true;
    set({});
    fn().then((data) => live && set({ data }), (error) => live && set({ error }));
    return () => { live = false; };
  }, deps);
  return st;
}
