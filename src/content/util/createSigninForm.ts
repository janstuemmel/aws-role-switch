import { mapToSwitchForm } from "../../common/mappers";
import {
  AWSConfigItem,
  SwitchRoleForm,
} from '../../types';

export const createSigninForm = (configItem: AWSConfigItem, csrf: string) => {
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
