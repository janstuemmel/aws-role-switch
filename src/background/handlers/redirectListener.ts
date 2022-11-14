import { updateTabUrl } from '../../common/browser/tabs';
import { mapToSwitchForm } from '../../common/mappers';

const removeUndefinedEntries = (obj: object) => Object.fromEntries(
  Object.entries(obj).filter(([_, v]) => v));

export const redirectListener = async (
  { type, ...configItem }: Message, 
  sender: chrome.runtime.MessageSender,
) => {
  if (type === 'redirect') {
    const params = mapToSwitchForm(configItem, {
      redirect_uri: sender.url || 'https://console.aws.amazon.com/console',
      _fromAWSRoleSwitchExtension: 'true',
    });
    const urlParams = new URLSearchParams(removeUndefinedEntries(params)).toString();
    await updateTabUrl(`https://signin.aws.amazon.com/switchrole?${urlParams}`);
  }
};
