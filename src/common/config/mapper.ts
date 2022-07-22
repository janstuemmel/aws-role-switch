import { ColorTranslator } from 'colortranslator';

function isValidEntry({ aws_account_id, role_name }: StoredConfigItem) {
  return aws_account_id && role_name;
}

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

export function mapConfig(config: StoredConfig): AWSConfig {
  const entries = Object.keys(config)
    .filter(val => isValidEntry(config[val]))
    .map(key => ({ 
      title: trimTitle(key), 
      ...config[key],
    }))
    .map(mapColor);

  return entries
    .sort(sortByGroupIndex(entries));
}
