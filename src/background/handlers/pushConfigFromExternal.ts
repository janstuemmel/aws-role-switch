export const pushConfigFromExternal = (
  msg: BackgroundScriptPushExternalConfigMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (res: unknown) => void
) => {
  console.log(msg.config, sender.id);
  sendResponse({hello: 'from aws-role-switch'});
};
