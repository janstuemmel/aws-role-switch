import {
  useEffect,
  useState,
  Dispatch,
  SetStateAction
} from 'react';
import { marked } from 'marked';
import readme from 'url:../../docs/README.md';

import { getConfig } from '../common/config';

export const useDocs = () => {
  const [docs, setDocs] = useState('');
  useEffect(() => {
    fetch(readme)
      .then(res => res.text())
      .then(txt => marked(txt))
      .then(setDocs);
  }, []);
  return docs;
};

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

export const useConfigFile = (): [string, Dispatch<SetStateAction<string>> ] => {
  const [configFile, setConfigFile] = useState('');
  useEffect(() => {
    getConfig().then(setConfigFile);
  }, []);
  return [configFile, setConfigFile];
};
