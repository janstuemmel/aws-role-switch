import { sendMessage } from '../../common/browser/runtime';
import { getCsrfFromPage } from '../util/getCsrfFromPage';
import { createSigninForm } from '../util/createSigninForm';

export const switchListener = (msg: Message) => {
  if (msg.type === 'switch') {
    const { type, ...configItem } = msg;
    try {
      // try to get csrf and create a form
      const csrf = getCsrfFromPage();
      const form = createSigninForm(configItem, csrf);
      
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
};
