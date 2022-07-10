import { storage } from "webextension-polyfill";

export const MAX_TOTAL_SIZE = 102400;
export const MAX_ITEM_SIZE = 8192;
export const MAX_ITEM_COUNT = 512;

export const getItems = () => {
  return storage.sync.get();
};

export const setItems = (items: Record<string, unknown>) => {
  return storage.sync.set(items);
};

export const getSize = async (): Promise<number> => {
  return storage.sync.getBytesInUse();
};
