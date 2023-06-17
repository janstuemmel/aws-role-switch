import { addMessageListener } from '../common/browser';
import { getMappedConfig } from './handlers/getMappedConfig';
import { redirectListener } from './handlers/redirectListener';

// return true to indicate a asyncronous sendResponse
addMessageListener((msg, sender, sendResponse) => {
  switch (msg.type) {
    case 'redirect':
      redirectListener(msg, sender);
      return true;
    case 'getConfig':
      getMappedConfig(msg.url).then((res) => {
        sendResponse(res);
      });
      return true;
  }
});
