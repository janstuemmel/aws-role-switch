import {submitSigninForm} from './handlers/submitSigninForm';

submitSigninForm(
  document.getElementById('switchrole_form') as HTMLFormElement,
  location.href,
);
