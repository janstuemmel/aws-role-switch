import validateColor from "validate-color";
import {
  AWSConfig,
  AWSConfigItem,
  StoredConfig,
  StoredConfigItem,
  StoredConfigItemSchema
} from "../../types";

function isValidEntry(configItem: StoredConfigItem) {
  return StoredConfigItemSchema.safeParse(configItem).success
}

function mapColor({ color = '', ...rest }: AWSConfigItem): AWSConfigItem {
  return {
    ...rest,
    color: validateColor(color) ? color : undefined
  }
}

function trimTitle(title: string) {
  return title.replace('profile', '').trim();
}

export function mapConfig(config: StoredConfig): AWSConfig {
  return Object.keys(config)
    .filter(val => isValidEntry(config[val]))
    .map(key => ({ 
      title: trimTitle(key), 
      ...config[key],
    }))
    .map(mapColor)
}
