import {getAccountAlias} from '../../common/browser/cookies';
import {
  filterBySourceAccountAlias,
  getConfig,
  getExternalConfigs,
  mapConfig,
  mergeConfigs,
  parseConfig,
} from '../../common/config';

// local config first so it wins on a section collision, then senders by id
const getActiveConfigs = async () => {
  const [config, externalConfigs] = await Promise.all([
    getConfig(),
    getExternalConfigs(),
  ]);
  const external = Object.entries(externalConfigs)
    .filter(([, {active}]) => active)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, {config}]) => parseConfig(config));
  return mergeConfigs(parseConfig(config), ...external);
};

export const getMappedConfig = async (aliasUrl: string) => {
  const alias = (await getAccountAlias(aliasUrl)) ?? '';
  return await getActiveConfigs()
    .then(mapConfig)
    .then(filterBySourceAccountAlias(alias));
};
