import browser, { Runtime } from 'webextension-polyfill';

import { addMessageListener } from './common/browser';
import { mapToSwitchForm } from './content/mapper';
import { Message } from './types';

addMessageListener(async (
  { type, ...configItem }: Message, 
  sender: Runtime.MessageSender,
) => {
  if (type === 'redirect') {
    const params = mapToSwitchForm(configItem, {
      redirect_uri: sender.url,
      _fromAWSRoleSwitchExtension: 'true',
    });
    const urlParams = new URLSearchParams(params).toString();
    await browser.tabs.update(sender.tab?.id, {
      url: `https://signin.aws.amazon.com/switchrole?${urlParams}`,
    });
  }
});
