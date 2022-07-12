import {
  useEffect,
  useState,
  Dispatch,
  SetStateAction
} from 'react';
import { marked } from 'marked';
import readme from 'url:../../docs/user.md';

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

export const useConfigFile = (): [string | undefined, Dispatch<SetStateAction<string | undefined>> ] => {
  const [configFile, setConfigFile] = useState<string | undefined>('');
  useEffect(() => {
    getConfig().then(setConfigFile);
  }, []);
  return [configFile, setConfigFile];
};
