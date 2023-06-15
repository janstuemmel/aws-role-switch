import { ColorTranslator } from 'colortranslator';

import { availableRegions } from './availableRegions';
import { removeUndefinedEntries } from '../util';

// Possible role_name syntax: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-quotas.html
const ROLE_ARN_REGEX = /^arn:aws:iam::(?<aws_account_id>\d{12}):role\/(?<role_name>[\w+=,.@-]+)/;
const HEX_COLOR_REGEX = /^(?<hex>[0-9A-Fa-f]{3,8})$/;

const isValidConfigItem = ({ aws_account_id, role_name }: Partial<AWSConfigItem>): boolean =>
 !!aws_account_id && !!role_name;

function getColorHEX(color: string) {
  const match = new RegExp(HEX_COLOR_REGEX).exec(color);
  const cssColor = match?.groups?.hex ? `#${match.groups.hex}` : color;

  try {
    return ColorTranslator.toHEX(cssColor);
  } catch (_) {
    return undefined;
  }
}

const trimTitle = (title: string) => title.replace(/^profile/, '').trim();

// sorts the config by first appearance of a group
// ungrouped entries should still be on top
export const sortByGroupIndex = (config: AWSConfig) => {

  const groupsIndex = config
    .filter((item: AWSConfigItem, idx: number) => config.findIndex((step) => item.group === step.group) === idx)
    .map(({ group }, idx) => ({ group, idx }));

  return (a: AWSConfigItem, b: AWSConfigItem) => {
    const itemA = groupsIndex.find(({ group }) => a.group === group);
    const itemB = groupsIndex.find(({ group }) => b.group === group);

    if (!itemA?.group) {
      return -1;
    }

    if (!itemB?.group) {
      return 1;
    }

    if (itemA.idx < itemB.idx) {
      return -1;
    }

    if (itemA.idx > itemB.idx) {
      return 1;
    }

    return 0;
  };
};

const buildConfigItem = (config: StoredConfig) => (key: string): Partial<AWSConfigItem> => {
  const { role_arn = '', aws_account_id, role_name, region: regionTo, color = '', ...rest } = config[key];  
  const region = availableRegions.includes(regionTo || '') ? regionTo : undefined;
  const match = new RegExp(ROLE_ARN_REGEX).exec(role_arn);
  const source = config[rest.source_profile ?? ''] ?? {};

  return removeUndefinedEntries({
    ...rest,
    title: trimTitle(key),
    color: getColorHEX(color),
    region,
    aws_account_id: match?.groups?.aws_account_id ?? aws_account_id,
    role_name: match?.groups?.role_name ?? role_name ?? source.target_role_name,
  });
};

export function mapConfig(config: StoredConfig): AWSConfig {
  const entries = Object.keys(config)
    .map(buildConfigItem(config))
    .filter(isValidConfigItem) as AWSConfig;

  return entries
    .sort(sortByGroupIndex(entries));
}
