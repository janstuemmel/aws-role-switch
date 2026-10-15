import hljs from 'highlight.js';
import {marked} from 'marked';
import {markedHighlight} from 'marked-highlight';
import {type Dispatch, type SetStateAction, useEffect, useState} from 'react';

import readme from '../../docs/usage.md';
import {
  getConfig,
  getExternalConfigs,
  onExternalConfigsChanged,
} from '../common/config';

marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, {language}).value;
    },
  }),
);

export const useDocs = () => {
  const [docs, setDocs] = useState('');
  useEffect(() => {
    fetch(readme)
      .then((res) => res.text())
      .then((txt) => marked.parse(txt))
      .then(setDocs);
  }, []);
  return docs;
};

export const useExternalConfigs = (): ExternalConfigs => {
  const [configs, setConfigs] = useState<ExternalConfigs>({});
  useEffect(() => {
    const reload = () => getExternalConfigs().then(setConfigs);
    reload();
    return onExternalConfigsChanged(reload);
  }, []);
  return configs;
};

export const useConfigFile = (): [
  string | undefined,
  Dispatch<SetStateAction<string | undefined>>,
] => {
  const [configFile, setConfigFile] = useState<string | undefined>('');
  useEffect(() => {
    getConfig().then(setConfigFile);
  }, []);
  return [configFile, setConfigFile];
};
