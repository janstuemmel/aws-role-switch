import { getAccountAlias } from '../../common/browser/cookies';
import {
  getConfig,
  mapConfig,
  parseConfig,
  filterBySourceAccountAlias,
} from '../../common/config';

export const getMappedConfig = async (aliasUrl: string) => {
  const alias = await getAccountAlias(aliasUrl) ?? '';
  return await getConfig()
    .then(parseConfig)
    .then(mapConfig)
    .then(filterBySourceAccountAlias(alias));
};
