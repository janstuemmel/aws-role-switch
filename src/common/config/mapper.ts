import { ColorTranslator } from "colortranslator";
import sortBy from "lodash/sortBy";

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

export function mapConfig(config: StoredConfig): AWSConfig {
  return sortBy(Object.keys(config)
    .filter(val => isValidEntry(config[val]))
    .map(key => ({ 
      title: trimTitle(key), 
      ...config[key],
    }))
    .map(mapColor), ['group', 'title']);
}
