import { mapConfig } from './mapper';
import { parseConfig } from './parse';
import { getConfig } from './storage';

export {
  setConfig,
  getConfig,
} from './storage';

export {
  parseConfig,
} from './parse'

export {
  mapConfig,
} from './mapper'

export const getMappedConfig = async () => {
  return getConfig()
    .then(parseConfig)
    .then(mapConfig)
}
