import {getAccountAlias} from '../../common/browser/cookies';
import {
  filterBySourceAccountAlias,
  getConfigSources,
  mapConfig,
  mergeConfigs,
} from '../../common/config';

export const getMappedConfig = async (aliasUrl: string) => {
  const alias = (await getAccountAlias(aliasUrl)) ?? '';
  return await getConfigSources()
    .then((sources) => mergeConfigs(...sources.map(({config}) => config)))
    .then(mapConfig)
    .then(filterBySourceAccountAlias(alias));
};
