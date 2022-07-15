export const openOptions = async (cb: () => void = () => {}) => {
  return chrome.runtime.openOptionsPage(cb);
};

export const addMessageListener = (
  cb: (msg: Message, sender: chrome.runtime.MessageSender) => void | Promise<void>
) => {
  return chrome.runtime.onMessage.addListener(cb);
};

export const sendMessage = async (msg: Message) => {
  return chrome.runtime.sendMessage(msg);
};
