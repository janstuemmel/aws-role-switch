import {groupBy} from '../../common/util';

const filterConfigItem = (filter: string) => (configItem: AWSConfigItem) =>
  !filter || // filter is empty -> return all items
  configItem.title.toLowerCase().includes(filter.toLowerCase()) ||
  configItem.aws_account_id.toLowerCase().startsWith(filter.toLowerCase()) ||
  configItem.group?.toLowerCase().includes(filter.toLowerCase());

export const mapConfigToGroups = (roles: AWSConfigItem[], filter = '') => {
  // filter by filter
  const items = roles.filter(filterConfigItem(filter));

  const groups = groupBy(items, ['group']);

  return Object.keys(groups).map((title) => ({title, children: groups[title]}));
};
