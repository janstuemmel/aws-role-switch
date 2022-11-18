type Callback = () => void;

export const createTab = async (
  url: string, 
  active = true, 
  cb: Callback = () => {}
) => chrome.tabs.create({ active, url }, cb);

export const getCurrentTabId = async () => {
  const tab = await new Promise((res: (tabs: chrome.tabs.Tab[]) => void) => 
    chrome.tabs.query({ active: true, currentWindow: true }, res));

  if (tab[0] && tab[0].id) {
    return tab[0].id;
  }
  throw new Error('could not get current tab id');
};

export const sendToCurrentTab = async (message: Message) => {
  const id = await getCurrentTabId();
  return new Promise((res, rej) => {
    // `chrome.runtime.lastError` has to be checked
    // https://stackoverflow.com/a/61530117
    chrome.tabs.sendMessage(id, message, () => {
      if (chrome.runtime.lastError) {
        rej(new Error('receiving end does not exist'));
        return;
      }
      res(undefined);
    });
  });
};

export const updateTabUrl = async (url: string) => {
  return chrome.tabs.update({ url });
};
