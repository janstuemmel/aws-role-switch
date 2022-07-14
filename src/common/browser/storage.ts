export const MAX_TOTAL_SIZE = 102400;
export const MAX_ITEM_SIZE = 8192;
export const MAX_ITEM_COUNT = 512;

export const getItems = () => {
  return new Promise((res) => chrome.storage.sync.get(res));
};

export const setItems = (items: Record<string, unknown>) => {
  return chrome.storage.sync.set(items);
};

export const getSize = async (): Promise<number> => {
  return chrome.storage.sync.getBytesInUse();
};
