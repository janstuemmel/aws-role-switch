import { useEffect } from 'react';

// TODO: migrate to https://usehooks.com/useKeyPress/
export const useKeydown = (listener: (evt: KeyboardEvent) => void) => {
  useEffect(() => {
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, []);
};
