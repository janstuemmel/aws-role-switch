import { IS_EXTENSION_KEY } from "../types";

const url = new URL(location.href);
const form = document.getElementById('switchrole_form') as HTMLFormElement;
const isExtension = url.searchParams.get(IS_EXTENSION_KEY) === 'true';

// automatically submit form when extension 
// redirects to aws role signin form
if (isExtension && form) {
  document.body.style.display = 'none';
  setTimeout(() => form.submit(), 0);
}
