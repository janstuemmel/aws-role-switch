import {
  Runtime,
  runtime,
} from 'webextension-polyfill';

import { Message } from '../../types';

export const openOptions = async (cb: () => void = () => {}) => {
  return await runtime.openOptionsPage().then(cb);
};

export const addMessageListener = (
  cb: (msg: Message, sender: Runtime.MessageSender) => void | Promise<void>
) => {
  return runtime.onMessage.addListener(cb);
};

export const sendMessage = async (msg: Message) => {
  return runtime.sendMessage(msg);
};
