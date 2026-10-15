import {dedupeSections} from './merge';
import {stringifyConfig} from './parse';

// the merged config as ini, each source's sections under a comment naming it
export function stringifyConfigSources(sources: ConfigSource[]): string {
  const configs = dedupeSections(sources.map(({config}) => config));
  return sources
    .map(({senderId}, idx) => ({senderId, config: configs[idx]}))
    .filter(({config}) => Object.keys(config).length)
    .map(
      ({senderId, config}) =>
        `# ${senderId ? `sender ${senderId}` : 'editor'}${stringifyConfig(config)}`,
    )
    .join('\n\n');
}
