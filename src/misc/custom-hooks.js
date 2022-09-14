import { useCallback, useEffect, useState, useRef } from 'react';
import { database } from './firebase';

export function useDrawer(defaultValue = false) {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, open, close };
}

// this is to use media query programatically. we pass max-width from another function and this prop will return us true or false based on
// max width.
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const queryList = window.matchMedia(query);
    setMatches(queryList.matches);

    const listener = eve => setMatches(eve.matches);
    queryList.addListener(listener);

    return () => queryList.removeListener(listener);
  }, [query]);

  return matches;
}

export function usePresence(userId) {
  const [presence, setPresence] = useState(null);
  useEffect(() => {
    const userStatusRef = database.ref(`/status/${userId}`);
    userStatusRef.on('value', snap => {
      if (snap.exists()) {
        const data = snap.val();
        setPresence(data);
      }
    });

    return () => userStatusRef.off();
  }, [userId]);
  return presence;
}

export function useHover() {
  const [value, setValue] = useState(false);

  const ref = useRef(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener('mouseover', handleMouseOver);
        node.addEventListener('mouseout', handleMouseOut);
      }
      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref.current] // Recall only if ref changes
  );

  return [ref, value];
}
