import { updateTabUrl } from '../../common/browser/tabs';
import { mapToSwitchForm } from '../../common/mappers';

export const redirectListener = async (
  { type, ...configItem }: Message, 
  sender: chrome.runtime.MessageSender,
) => {
  if (type === 'redirect') {
    const params = mapToSwitchForm(configItem, {
      redirect_uri: sender.url || 'https://console.aws.amazon.com/console',
      _fromAWSRoleSwitchExtension: 'true',
    });
    const urlParams = new URLSearchParams(params).toString();
    await updateTabUrl(`https://signin.aws.amazon.com/switchrole?${urlParams}`);
  }
};
