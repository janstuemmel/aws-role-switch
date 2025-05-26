import {getStorageItems, setStorageItems} from '../browser';
import {compressConfig, decompressConfig} from './gzip';

const CONFIG_KEYS = [
  'configFile', // for legacy reasons
  'configFile_1',
  'configFile_2',
  'configFile_3',
  'configFile_4',
  'configFile_5',
  'configFile_6',
  'configFile_7',
  'configFile_8',
  'configFile_9',
];

const splitEqual = (str: string, num: number) => {
  const parts = Math.ceil(str.length / num);
  return Array(num)
    .fill(null)
    .map((_, i) => str.substring(i * parts, i * parts + parts));
};

const splitConfigFile = (config: string) => {
  return splitEqual(config, CONFIG_KEYS.length).reduce((p, c, i) => {
    return {
      ...p,
      [CONFIG_KEYS[i]]: c,
    };
  }, {});
};

export async function getConfig(): Promise<string | undefined> {
  const items = await getStorageItems(CONFIG_KEYS);
  const config = Object.values(items).join('');
  if (items) {
    return decompressConfig(config);
  }
}

export async function setConfig(config: string) {
  const compressed = compressConfig(config);
  const parts = splitConfigFile(compressed);
  return setStorageItems(parts);
}
