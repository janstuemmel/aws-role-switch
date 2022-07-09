import {
  useEffect,
  useState,
} from 'react';

export const useColorScheme = () => {
  const matchesDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useState<'dark' | 'light'>(matchesDark ? 'dark' : 'light');
  const listener = (event: MediaQueryListEvent) => setTheme(() => event.matches ? 'dark' : 'light');
  
  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', listener);
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', listener);
    };
  }, []);

  return theme;
};
