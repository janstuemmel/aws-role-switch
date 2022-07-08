import { groupBy } from 'lodash';
import {
  AWSConfig,
  StoredConfig,
  StoredConfigItem,
  StoredConfigItemSchema
} from "../../types";

function isValidEntry(configItem: StoredConfigItem) {
  return StoredConfigItemSchema.safeParse(configItem).success
}

function trimTitle(title: string) {
  return title.replace('profile', '').trim();
}

export function mapConfig(config: StoredConfig): AWSConfig {
  return Object.keys(config)
    .filter(val => isValidEntry(config[val]))
    .map(key => ({ 
      title: trimTitle(key), 
      ...config[key] 
    }))
}
 