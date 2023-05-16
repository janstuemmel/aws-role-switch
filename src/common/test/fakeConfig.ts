import { faker } from '@faker-js/faker';

import { sortByGroupIndex } from '../config/mapper';
import { stringifyConfig } from '../config/parse';

export const generateConfigItems = (numEntries: number, numGroups: number): AWSConfigItem[] => {
  const groups = faker.word.words(numGroups).split(' ');
  const items = Array.from({ length: numEntries }, (_, i) => ({
    aws_account_id: faker.string.numeric(12),
    role_name: faker.helpers.arrayElement(['AdminFullAccess', 'RestrictedAdmin']),
    title: faker.helpers.fake(`{{lorem.word}}-{{lorem.word}}-project-${i}`),
    color: faker.color.human(),
    group: faker.helpers.arrayElement(groups),
  }));
  return items.sort(sortByGroupIndex(items));
};

export const generate = (numEntries = 1000, numGroups = 100) => {
  const config = generateConfigItems(numEntries, numGroups);
  const ini = config
    .reduce((a, { title, ...rest }) => ({ ...a, [title]: rest}), {});
  return stringifyConfig(ini);
};
