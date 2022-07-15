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

export const sendToCurrentTab = async (
  message: Message, 
  cb: Callback = () => {}
) => {
  const id = await getCurrentTabId();
  return chrome.tabs.sendMessage(id, message, cb);
};

export const updateTabUrl = async (url: string) => {
  return chrome.tabs.update({ url });
};
