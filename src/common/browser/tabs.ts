import { tabs } from "webextension-polyfill";

type Callback = () => void;

export const createTab = async (
  url: string, 
  active: boolean = true, 
  cb: Callback = () => {}
) => tabs.create({ active, url }).then(cb);

export const getCurrentTabId = async () => {
  const tab = await tabs.query({ active: true, currentWindow: true });
  if (tab[0] && tab[0].id) {
    return tab[0].id;
  }
  throw new Error('could not get current tab id');
};

export const sendToCurrentTab = async (message: any, cb: Callback = () => {}) => {
  try {
    const id = await getCurrentTabId();
    await tabs.sendMessage(id, message);
    cb();
  } catch (err) {
    throw err
  }
};
