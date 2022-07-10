import { ColorTranslator } from "colortranslator";

import {
  AWSConfig,
  AWSConfigItem,
  StoredConfig,
  StoredConfigItem,
  StoredConfigItemSchema
} from "../../types";

function isValidEntry(configItem: StoredConfigItem) {
  return StoredConfigItemSchema.safeParse(configItem).success;
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

// sorts the config by group
// ungrouped entries on top
const sortByGroup = (a: AWSConfigItem, b: AWSConfigItem) => {
  if (!a.group) {
    return -1;
  }

  if (!b.group) {
    return 1;
  }

  if (a.group < b.group) {
    return -1;
  }

  if (a.group > b.group) {
    return 1;
  }

  return 0;
};

export function mapConfig(config: StoredConfig): AWSConfig {
  return Object.keys(config)
    .filter(val => isValidEntry(config[val]))
    .map(key => ({ 
      title: trimTitle(key), 
      ...config[key],
    }))
    .map(mapColor)
    .sort(sortByGroup);
}
