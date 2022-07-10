import { faker } from '@faker-js/faker';

import { stringifyConfig } from '../src/common/config/parse';
import { AWSConfigItem } from "../src/types";

const groups = faker.random.words(30).split(' ');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const config: AWSConfigItem[] = Array.from({ length: 200 }, (_, i) => ({
  aws_account_id: faker.random.numeric(12),
  role_name: faker.helpers.arrayElement(['AdminFullAccess', 'RestrictedAdmin']),
  title: faker.fake(`{{random.word}}-{{random.word}}-project-${i}`),
  color: faker.color.human(),
  group: faker.helpers.arrayElement(groups),
}));

const ini = config
  .reduce((a, { title, ...rest }) => ({ ...a, [title]: rest}), {});

const file = stringifyConfig(ini);

console.log(file);
