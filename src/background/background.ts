import { addMessageListener } from '../common/browser';
import { redirectListener } from './handlers/redirectListener';

addMessageListener(redirectListener);
