import { groupBy } from 'lodash';
import {
  AWSConfigGroup,
  StoredConfig,
  StoredConfigItem,
  StoredConfigItemSchema
} from "../../types";

const DEFAULT_GROUP = 'default';

function isValidEntry(configItem: StoredConfigItem) {
  return StoredConfigItemSchema.safeParse(configItem).success
}

function trimTitle(title: string) {
  return title.replace('profile', '').trim();
}

export function mapConfig(config: StoredConfig): AWSConfigGroup {
  // normalize stored config
  const awsConfig = Object.keys(config)
    .filter(val => isValidEntry(config[val]))
    .map(key => ({ 
      title: trimTitle(key), 
      ...config[key] 
    }))

  // return groups
  return groupBy(awsConfig, (item) => item.group || DEFAULT_GROUP);
}
