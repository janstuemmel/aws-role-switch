export const openOptions = async (cb: () => void = () => {}) => {
  return chrome.runtime.openOptionsPage(cb);
};

// Chrome does not understand promises here
// use sendResponse and return=true in listener callback
// use callback style in sendMessage
// https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-996926374

export const addMessageListener = (cb: (
  msg: Message, 
  sender: chrome.runtime.MessageSender,
  sendResponse: (res: unknown) => void
) => void) => {
  chrome.runtime.onMessage.addListener(cb);
};

export const sendMessage = async <T>(msg: Message) => {
  return new Promise<T>((res) => {
    chrome.runtime.sendMessage(msg, res);
  });
};
