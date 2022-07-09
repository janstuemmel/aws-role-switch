import { runtime } from "webextension-polyfill"
import { AWSConfigItem } from "../../types";

export const openOptions = async (cb: () => void = () => {}) => {
  return await runtime.openOptionsPage().then(cb)
}

export const addMessageListener = (cb: (data: AWSConfigItem) => void) => {
  return runtime.onMessage.addListener(cb);
}
