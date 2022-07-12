import { addMessageListener } from '../common/browser';
import { switchListener } from './handlers/switchListener';

addMessageListener(switchListener);
