export const submitSigninForm = (form: HTMLFormElement, locationHref: string) => {
  const url = new URL(locationHref);
  const key: keyof SwitchRoleFormFromExtension = '_fromAWSRoleSwitchExtension';
  const isExtension = url.searchParams.get(key) === 'true';

  // automatically submit form when extension 
  // redirects to aws role signin form
  if (isExtension && form) {
    document.body.style.display = 'none';
    setTimeout(() => form.submit(), 0);
  }
};
