import { useEffect } from 'react';

export const useKeydown = (listener: (evt: KeyboardEvent) => void) => {
  useEffect(() => {
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, []);
};
