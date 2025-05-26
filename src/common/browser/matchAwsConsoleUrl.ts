import outmatch from 'outmatch';

import awsConsoleUrls from '../const/awsConsoleUrls';

export default (url: string | undefined) => {
  return outmatch(awsConsoleUrls, {separator: '.'})(url || '');
};
