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

// callbacks rather than promises, which the chrome namespace lacks in firefox mv2
const withLastError = <T>(
  call: (done: (value: T) => void) => void,
): Promise<T> =>
  new Promise((res, rej) =>
    call((value) => {
      const error = chrome.runtime.lastError;
      error ? rej(new Error(error.message)) : res(value);
    }),
  );

// local storage holds data that must not count against the sync quota
export const getLocalItems = (keys: string[] | null) => {
  return withLastError<Record<string, unknown>>((done) =>
    chrome.storage.local.get(keys, done),
  );
};

export const setLocalItems = (items: Record<string, unknown>) => {
  return withLastError<void>((done) => chrome.storage.local.set(items, done));
};

export const removeLocalItems = (keys: string[]) => {
  return withLastError<void>((done) => chrome.storage.local.remove(keys, done));
};

// returns the unsubscribe function
export const addLocalChangeListener = (
  cb: (changes: Record<string, chrome.storage.StorageChange>) => void,
) => {
  const listener = (
    changes: Record<string, chrome.storage.StorageChange>,
    areaName: string,
  ) => {
    if (areaName === 'local') cb(changes);
  };
  chrome.storage.onChanged.addListener(listener);
  return () => chrome.storage.onChanged.removeListener(listener);
};

export const getSize = async (): Promise<number> => {
  // TODO: use promise instead of callback when bug resolved
  // there's a bug where firefox says that getBytesInUse()
  // is undefined when using with promise
  return new Promise((res) => chrome.storage.sync.getBytesInUse(res));
};
