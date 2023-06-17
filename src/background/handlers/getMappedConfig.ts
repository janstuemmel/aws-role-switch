import { getAccountAlias } from '../../common/browser/cookies';
import {
  getConfig,
  mapConfig,
  parseConfig,
} from '../../common/config';
import { filterBySourceAccountAlias } from '../../common/config/filterBySourceAccountAlias';

export const getMappedConfig = async (aliasUrl: string) => {
  const alias = await getAccountAlias(aliasUrl) ?? '';
  return await getConfig()
    .then(parseConfig)
    .then(mapConfig)
    .then(filterBySourceAccountAlias(alias));
};
