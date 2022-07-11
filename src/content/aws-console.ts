import { addMessageListener } from '../common/browser';
import { mapToSwitchForm } from './mapper';
import { 
  AWSConfigItem,
  Message,
  SwitchRoleForm,
} from '../types';
import { sendMessage } from '../common/browser/runtime';

const tryGetCsrf = () => {
  const csrfFromAWSC = window.wrappedJSObject?.AWSC?.Auth.getMbtc();
  if (csrfFromAWSC) {
    return String(csrfFromAWSC);
  }
  const csrfElem = document.querySelector('input[name=csrf]') as HTMLInputElement;
  if (csrfElem) {
    return csrfElem.value;
  }
  throw new Error('csrf not found');
};

const createSwitchRoleForm = (configItem: AWSConfigItem, csrf: string) => {
  const redirect_uri = location.href;
  const params = mapToSwitchForm(configItem, { csrf, redirect_uri });

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

addMessageListener(({ type, ...configItem }: Message) => {
  if (type === 'switch') {
    try {
      // try to get csrf and create a form
      const csrf = tryGetCsrf();
      const form = createSwitchRoleForm(configItem, csrf);

      // append to body and submit it directly
      document.body.appendChild(form);
      form.submit();
    } catch(err) {
      console.warn(err);

      // if above fails, we send a tab redirect request
      // to background js, from there we redirect the active
      // tab the aws's switch role form, and submit that
      sendMessage({ type: 'redirect', ...configItem});
    }
  }
});
