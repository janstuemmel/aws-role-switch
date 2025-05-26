export const MAX_TOTAL_SIZE = 102400;
export const MAX_ITEM_SIZE = 8192;
export const MAX_ITEM_COUNT = 512;

export const getItems = (keys: string[]) => {
  return new Promise((res: (items: Record<string, unknown>) => void) =>
    chrome.storage.sync.get(keys, res),
  );
};

export const setItems = (items: Record<string, unknown>) => {
  return chrome.storage.sync.set(items);
};

export const getSize = async (): Promise<number> => {
  // TODO: use promise instead of callback when bug resolved
  // there's a bug where firefox says that getBytesInUse()
  // is undefined when using with promise
  return new Promise((res) => chrome.storage.sync.getBytesInUse(res));
};
