export const getCsrfFromPage = () => {
  const csrfFromAWSC = window.wrappedJSObject?.AWSC?.Auth.getMbtc();
  if (csrfFromAWSC) {
    return String(csrfFromAWSC);
  }
  const csrfElem = document.querySelector(
    'input[name=csrf]',
  ) as HTMLInputElement;
  if (csrfElem) {
    return csrfElem.value;
  }
  throw new Error('csrf not found');
};
