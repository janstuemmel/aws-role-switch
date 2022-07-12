import { Runtime } from 'webextension-polyfill';

import { updateTabUrl } from '../../common/browser/tabs';
import { mapToSwitchForm } from '../../common/mappers';
import {
  IS_EXTENSION_KEY,
  Message,
} from '../../types';

export const redirectListener = async (
  { type, ...configItem }: Message, 
  sender: Runtime.MessageSender,
) => {
  if (type === 'redirect') {
    const params = mapToSwitchForm(configItem, {
      redirect_uri: sender.url,
      [IS_EXTENSION_KEY]: 'true',
    });
    const urlParams = new URLSearchParams(params).toString();
    const url = `https://signin.aws.amazon.com/switchrole?${urlParams}`;
    await updateTabUrl(sender.tab?.id, url);
  }
};
