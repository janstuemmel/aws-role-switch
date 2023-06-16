import { addMessageListener } from '../common/browser';
import { getMappedConfig } from '../common/config';
import { getAccountAlias } from './handlers/getAccountAlias';
import { redirectListener } from './handlers/redirectListener';

// return true to indicate a asyncronous sendResponse
addMessageListener((msg, sender, sendResponse) => {
  switch (msg.type) {
    case 'redirect':
      redirectListener(msg, sender);
      return true;
    case 'getConfig':
      getMappedConfig().then((res) => {
        sendResponse(res);
      });
      return true;
    case 'getAccountAlias':
      getAccountAlias(msg.url).then((res) => {
        sendResponse(res);
      });
      return true;
  }
});
