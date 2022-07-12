import { IS_EXTENSION_KEY } from '../../types';

export const submitSigninForm = (form: HTMLFormElement, locationHref: string) => {
  const url = new URL(locationHref);
  const isExtension = url.searchParams.get(IS_EXTENSION_KEY) === 'true';

  // automatically submit form when extension 
  // redirects to aws role signin form
  if (isExtension && form) {
    document.body.style.display = 'none';
    setTimeout(() => form.submit(), 0);
  }
};
