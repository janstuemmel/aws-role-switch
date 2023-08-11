import { availableRegions } from './availableRegions';
import { removeUndefinedEntries } from '../util';
import { getCssColor } from '../util/getCssColor';

// Possible role_name syntax: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-quotas.html
const ROLE_ARN_REGEX = /^arn:aws:iam::(?<aws_account_id>\d{12}):role\/(?<role_name>[\w+=,.@\\/-]+)/;

const isValidConfigItem = ({ aws_account_id, role_name, target_role_name }: Partial<AWSConfigItem>): boolean =>
 !!aws_account_id && !!role_name && !target_role_name;


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

// returns the first appearance of target_role_name in source profiles
export const getTargetRoleName = (config: StoredConfig, source = ''): string | undefined => {
  const item = config[source];

  if (item?.target_role_name) {
    return item.target_role_name;
  }

  if (item?.source_profile) {
    return getTargetRoleName(config, item.source_profile);
  }
};

// returns the last appearance of aws_account_id in source profiles
export const getSourceAccountId = (config: StoredConfig, source = '', carry?: string): string | undefined => {
  const item = config[source];

  if (item?.source_profile) {
    return getSourceAccountId(config, item.source_profile, item.aws_account_id);
  }

  if (item?.aws_account_id) {
    return item.aws_account_id;
  }

  return carry;
};

const buildConfigItem = (config: StoredConfig) => (key: string): Partial<AWSConfigItem> => {
  const { 
    role_arn = '',
    aws_account_id,
    role_name,
    region: regionTo,
    color = '',
    source_profile, 
    ...rest
  } = config[key];  
  const region = availableRegions.includes(regionTo || '') ? regionTo : undefined;
  const match = new RegExp(ROLE_ARN_REGEX).exec(role_arn);

  return removeUndefinedEntries({
    ...rest,
    title: trimTitle(key),
    color: getCssColor(color),
    region,
    aws_account_id: match?.groups?.aws_account_id ?? aws_account_id,
    role_name: match?.groups?.role_name ?? role_name ?? getTargetRoleName(config, source_profile),
    source_profile_account_id: getSourceAccountId(config, source_profile),
  } as AWSConfigItem);
};

export function mapConfig(config: StoredConfig): AWSConfig {
  const entries = Object.keys(config)
    .map(buildConfigItem(config))
    .filter(isValidConfigItem) as AWSConfig;

  return entries
    .sort(sortByGroupIndex(entries));
}
