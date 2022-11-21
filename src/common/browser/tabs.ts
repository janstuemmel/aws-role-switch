import matchAwsConsoleUrl from "./matchAwsConsoleUrl";

type Callback = () => void;

export const createTab = async (
  url: string, 
  active = true, 
  cb: Callback = () => {}
) => chrome.tabs.create({ active, url }, cb);

export const getCurrentTab = async () => {
  const tabs = await new Promise((res: (tabs: chrome.tabs.Tab[]) => void) => 
    chrome.tabs.query({ active: true, currentWindow: true }, res));
  return tabs[0];
};

export const sendToCurrentAwsConsoleTab = async (message: Message) => {
  const tab = await getCurrentTab();

  // only send to aws console tabs
  if (tab.id && matchAwsConsoleUrl(tab.url)) {
    return chrome.tabs.sendMessage(tab.id, message);
  }
  
  throw new Error('active tab not an aws console');
};

export const updateTabUrl = async (url: string) => {
  return chrome.tabs.update({ url });
};
