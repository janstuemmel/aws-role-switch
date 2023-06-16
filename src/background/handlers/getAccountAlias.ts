export const getAccountAlias = async (url: string) => chrome.cookies.get({url, name: 'aws-account-alias'})
  .then(cookie => cookie?.value)
  .catch(() => undefined);
