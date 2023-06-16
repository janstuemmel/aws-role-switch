import { groupBy } from "../../common/util";

const filterConfigItem = (filter: string) => (configItem: AWSConfigItem) => 
  !filter || // filter is empty -> return all items
  configItem.title.toLowerCase().includes(filter.toLowerCase()) || 
  configItem.aws_account_id.toLowerCase().startsWith(filter.toLowerCase()) ||
  configItem.group?.toLowerCase().includes(filter.toLowerCase());

const filterBySourceAccountAlias = (alias: string) => (configItem: AWSConfigItem) =>
  !alias ||
  configItem.source_profile_account_id === alias;

export const mapConfigToGroups = (roles: AWSConfigItem[], filter = '', alias = '') => {
  // config has at least one item with matching alias
  const hasSourceAccountAlias = !!roles.find((configItem) => configItem.source_profile_account_id === alias);
  
  // filter by filter and alias
  const items = roles
    .filter(filterConfigItem(filter))
    .filter(hasSourceAccountAlias ? filterBySourceAccountAlias(alias) : () => true);

  const groups = groupBy(items, ['group']);

  return Object.keys(groups).map((title) => ({ title, children: groups[title] }));
};
