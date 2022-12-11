import { updateTabUrl } from '../../common/browser/tabs';
import { mapToSwitchForm } from '../../common/mappers';

const removeUndefinedEntries = (obj: object) => Object.fromEntries(
  Object.entries(obj).filter(([_, v]) => v));

export const redirectListener = async (
  msg: AWSConfigItem, 
  sender: chrome.runtime.MessageSender,
) => {
  const params = mapToSwitchForm(msg, {
    redirect_uri: sender.url || 'https://console.aws.amazon.com/console',
    _fromAWSRoleSwitchExtension: 'true',
  });
  const urlParams = new URLSearchParams(removeUndefinedEntries(params)).toString();
  return updateTabUrl(`https://signin.aws.amazon.com/switchrole?${urlParams}`);
};
