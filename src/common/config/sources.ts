import {getExternalConfigs} from './external';
import {parseConfig} from './parse';
import {getConfig} from './storage';

// editor config first so it wins on a section collision, then enabled senders by id
export async function getConfigSources(): Promise<ConfigSource[]> {
  const [config, externalConfigs] = await Promise.all([
    getConfig(),
    getExternalConfigs(),
  ]);
  const senders = Object.entries(externalConfigs)
    .filter(([, {active}]) => active)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([senderId, {config}]) => ({senderId, config: parseConfig(config)}));
  return [{config: parseConfig(config)}, ...senders];
}
