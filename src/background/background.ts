import { addMessageListener } from '../common/browser';
import { getMappedConfig } from '../common/config';
import { redirectListener } from './handlers/redirectListener';

addMessageListener((msg, sender, sendResponse) => {
  switch (msg.type) {
    case 'redirect':
      redirectListener(msg, sender);
      break;
    case 'getConfig':
      getMappedConfig().then((res) => {
        sendResponse(res);
      });
  }
});
