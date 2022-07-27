import { ColorTranslator } from 'colortranslator';

type AccountRole = { role_name: string, aws_account_id: string }

const isValidEntry = ({aws_account_id, role_name, role_arn}: AWSStoredConfigItem): boolean =>
 !!aws_account_id && !!role_name || !!role_arn;

function getColorHEX(color: string) {
  try {
    return ColorTranslator.toHEX(color);
  } catch (_) {
    return undefined;
  }
}

function mapColor({ color = '', ...rest }: AWSConfigItem): AWSConfigItem {
  return {
    ...rest,
    color: getColorHEX(color)
  };
}

function trimTitle(title: string) {
  return title.replace('profile', '').trim();
}

// sorts the config by first appearance of a group
// ungrouped entries should still be on top
const sortByGroupIndex = (config: AWSConfig) => {

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

export const awsStoredConfigItemToAWSConfigItem = 
  (title: string, sci: AWSStoredConfigItem): AWSConfigItem | undefined => {
  const optionalData: AWSConfigOptionalData = sci;
  if (sci.aws_account_id && sci.role_name) {
    const item: AWSConfigItem = {
      ...optionalData,
      title,
      aws_account_id: sci.aws_account_id,
      role_name: sci.role_name
    };

    return item;
  }
  if (sci.role_arn) {
    const accountAndRole = extractAccountAndRoleFromRoleARN(sci.role_arn);
    if (accountAndRole) {
      const item: AWSConfigItem = {
        title,
        ...optionalData,
        ...accountAndRole,
      };
      return item;
    }
  }

  return undefined;
};

export const extractAccountAndRoleFromRoleARN = (roleArn: string): AccountRole | undefined => {
  const arnRoleRe = /^arn:aws:iam::(?<account>\d{12}):role\/(?<roleName>\w+)/;
  const match = roleArn.trim().match(arnRoleRe);
  
  if (match?.groups) {
    return { role_name: match.groups.roleName, aws_account_id: match.groups.account };
  }
  return undefined;
};

export function mapConfig(config: StoredConfig): AWSConfig {
  const entries = Object.keys(config)
    .filter(val => isValidEntry(config[val]))
    .map(configEntry => awsStoredConfigItemToAWSConfigItem(trimTitle(configEntry), config[configEntry]))
    .filter(item => !!item) // filter items that could not be transformed properly
    .map(mapColor);

  return entries
    .sort(sortByGroupIndex(entries));
}
