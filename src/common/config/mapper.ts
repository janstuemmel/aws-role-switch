import { ColorTranslator } from 'colortranslator';

import { availableRegions } from './availableRegions';

// Possible role_name syntax: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-quotas.html
const ROLE_ARN_REGEX = /^arn:aws:iam::(?<aws_account_id>\d{12}):role\/(?<role_name>[\w+=,.@-]+)/;

const isValidConfigEntry = ({ aws_account_id, role_name, role_arn }: AWSStoredConfigItem): boolean =>
 !!aws_account_id && !!role_name || !!role_arn;

const isValidConfigItem = ({ aws_account_id, role_name }: Partial<AWSConfigItem>): boolean =>
 !!aws_account_id && !!role_name;

function getColorHEX(color: string) {
  try {
    return ColorTranslator.toHEX(color);
  } catch (_) {
    return undefined;
  }
}

const mapColor = ({ color = '', ...rest }: Partial<AWSConfigItem>): Partial<AWSConfigItem> => 
  ({ ...rest, color: getColorHEX(color) });

const trimTitle = (title: string) => title.replace('profile', '').trim();

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

const buildConfigItem = (
  title: string, 
  { role_arn = '', aws_account_id, role_name, region: regionTo, ...rest }: AWSStoredConfigItem
): Partial<AWSConfigItem> => {  
  const region = availableRegions.includes(regionTo || '') ? regionTo : undefined;
  const match = role_arn.trim().match(ROLE_ARN_REGEX);

  return {
    ...rest,
    title: trimTitle(title),
    region,
    aws_account_id: match?.groups?.aws_account_id || aws_account_id,
    role_name: match?.groups?.role_name || role_name,
  };
};

export function mapConfig(config: StoredConfig): AWSConfig {
  const entries = Object.keys(config)
    .filter((val) => isValidConfigEntry(config[val]))
    .map((configEntry) => buildConfigItem(configEntry, config[configEntry]))
    .filter(isValidConfigItem)
    .map(mapColor) as AWSConfig;

  return entries
    .sort(sortByGroupIndex(entries));
}
