import { addMessageListener } from '../common/browser';
import { 
  AWSConfigItem,
  SwitchRoleForm,
  SwitchRoleParamsSchema
} from '../types';

const createSwitchRoleForm = (configItem: AWSConfigItem) => {
  // TODO: works only for firefox atm
  // https://stackoverflow.com/questions/12395722/can-the-window-object-be-modified-from-a-chrome-extension
  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Sharing_objects_with_page_scripts
  // https://gist.github.com/devjin0617/3e8d72d94c1b9e69690717a219644c7a
  const csrf = String(window.wrappedJSObject.AWSC.Auth.getMbtc()); 

  // create switch role form args
  const params = SwitchRoleParamsSchema.parse({
    account: configItem.aws_account_id,
    roleName: configItem.role_name,
    color: configItem.color?.replace('#', ''),
    displayName: `${configItem.title} | ${configItem.aws_account_id}`.slice(0, 64),
    redirect_uri: location.href,
    csrf,
  } as SwitchRoleForm);

  // create switch role form
  const form = document.createElement('form');
  form.style.display = 'none';
  form.setAttribute('method', 'POST');
  form.setAttribute('action', 'https://signin.aws.amazon.com/switchrole');

  for (const key in params) {
    const value = params[key as keyof SwitchRoleForm];
    if (value) {
      const input = document.createElement('input');
      input.setAttribute('name', key);
      input.setAttribute('value', value);
      form.appendChild(input);
    }
  }

  return form;
};

addMessageListener((configItem: AWSConfigItem) => {
  try {
    const form = createSwitchRoleForm(configItem);
    document.body.appendChild(form);
    form.submit();
  } catch(err) {
    console.error(err);
  }
});
