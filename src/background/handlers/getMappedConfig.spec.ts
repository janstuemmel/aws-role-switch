jest.mock('../../common/config/storage');
jest.mock('../../common/browser/cookies');

import {getAccountAlias} from '../../common/browser/cookies';
import {getConfig} from '../../common/config/storage';
import {mock} from '../../test/helper';
import {getMappedConfig} from './getMappedConfig';

const getConfigMock = mock(getConfig);
const getAccountAliasMock = mock(getAccountAlias);

beforeEach(() => {
  getConfigMock.mockClear();
  getAccountAliasMock.mockClear();
});

it('shows all roles when alias not matching any roles', async () => {
  getAccountAliasMock.mockImplementationOnce(() => Promise.resolve('invalid'));
  getConfigMock.mockImplementationOnce(() =>
    Promise.resolve(`
[org1]
target_role_name = foo
aws_account_id = org1

[role1]
aws_account_id = bar1
source_profile = org1

[role2]
aws_account_id = bar2
role_name = foo
`),
  );
  expect(await getMappedConfig('')).toMatchInlineSnapshot(`
[
  {
    "aws_account_id": "bar2",
    "role_name": "foo",
    "title": "role2",
  },
  {
    "aws_account_id": "bar1",
    "role_name": "foo",
    "source_profile_account_id": "org1",
    "title": "role1",
  },
]
`);
});

it('shows only role associated with source role when alias matching', async () => {
  getAccountAliasMock.mockImplementationOnce(() => Promise.resolve('org1'));
  getConfigMock.mockImplementationOnce(() =>
    Promise.resolve(`
[org1]
target_role_name = foo
aws_account_id = org1

[role1]
aws_account_id = bar1
source_profile = org1

[role2]
aws_account_id = bar2
role_name = foo
`),
  );
  expect(await getMappedConfig('')).toMatchInlineSnapshot(`
[
  {
    "aws_account_id": "bar1",
    "role_name": "foo",
    "source_profile_account_id": "org1",
    "title": "role1",
  },
]
`);
});

it('shows all roles when getAccountAlias errors', async () => {
  getAccountAliasMock.mockImplementationOnce(() => Promise.resolve(undefined));
  getConfigMock.mockImplementationOnce(() =>
    Promise.resolve(`
[org1]
target_role_name = foo
aws_account_id = org1

[role1]
aws_account_id = bar1
source_profile = org1

[role2]
aws_account_id = bar2
role_name = foo
`),
  );
  expect(await getMappedConfig('')).toMatchInlineSnapshot(`
[
  {
    "aws_account_id": "bar2",
    "role_name": "foo",
    "title": "role2",
  },
  {
    "aws_account_id": "bar1",
    "role_name": "foo",
    "source_profile_account_id": "org1",
    "title": "role1",
  },
]
`);
});
