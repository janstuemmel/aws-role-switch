import { tabs } from "webextension-polyfill";

import { Message } from "../../types";

type Callback = () => void;

export const createTab = async (
  url: string, 
  active = true, 
  cb: Callback = () => {}
) => tabs.create({ active, url }).then(cb);

export const getCurrentTabId = async () => {
  const tab = await tabs.query({ active: true, currentWindow: true });
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
  return tabs.sendMessage(id, message).then(cb);
};
