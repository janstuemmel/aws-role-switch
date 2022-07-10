import {
  getStorageItems,
  setStorageItems,
} from '../browser';
import {
  compressConfig,
  decompressConfig,
} from './gzip';

export async function getConfig(): Promise<string> {
  const items = await getStorageItems();
  const configItem = items['configFile'] as string;
  return decompressConfig(configItem);
}

export async function setConfig(config: string) {
  const compressed = compressConfig(config);
  return setStorageItems({ configFile: compressed });
}
