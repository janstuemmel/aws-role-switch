import { browserOrChrome } from ".";

export const getAccountAlias = async (url: string) => browserOrChrome().cookies.get({url, name: 'aws-account-alias'})
  .then(cookie => cookie?.value)
  .catch(() => undefined);
