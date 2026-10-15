jest.mock('../../common/config/storage');
jest.mock('../../common/config/external');
jest.mock('../../common/browser/cookies');

import {getAccountAlias} from '../../common/browser/cookies';
import {getExternalConfigs} from '../../common/config/external';
import {getConfig} from '../../common/config/storage';
import {mock} from '../../test/helper';
import {getMappedConfig} from './getMappedConfig';

const getConfigMock = mock(getConfig);
const getExternalConfigsMock = mock(getExternalConfigs);
const getAccountAliasMock = mock(getAccountAlias);

beforeEach(() => {
  getConfigMock.mockClear();
  getAccountAliasMock.mockClear();
  getExternalConfigsMock.mockReset().mockResolvedValue({});
});

describe('with external configs', () => {
  beforeEach(() => {
    getAccountAliasMock.mockResolvedValue(undefined);
    getConfigMock.mockResolvedValue(`
[local]
aws_account_id = 111111111111
role_name = local
`);
  });

  // ungrouped roles have no stable order, groups do
  it('adds roles of approved senders after local roles', async () => {
    getConfigMock.mockResolvedValue(
      '[local]\naws_account_id = 1\nrole_name = r\ngroup = local',
    );
    getExternalConfigsMock.mockResolvedValue({
      sender2: {
        active: true,
        config: '[ext2]\naws_account_id = 3\nrole_name = r\ngroup = ext2',
        updatedAt: 0,
      },
      sender1: {
        active: true,
        config: '[ext1]\naws_account_id = 2\nrole_name = r\ngroup = ext1',
        updatedAt: 0,
      },
    });
    const titles = (await getMappedConfig('')).map(({title}) => title);
    expect(titles).toEqual(['local', 'ext1', 'ext2']);
  });

  it('ignores roles of unapproved senders', async () => {
    getExternalConfigsMock.mockResolvedValue({
      sender1: {
        active: false,
        config: '[ext1]\naws_account_id = 2\nrole_name = r',
        updatedAt: 0,
      },
    });
    const titles = (await getMappedConfig('')).map(({title}) => title);
    expect(titles).toEqual(['local']);
  });

  it('keeps the local role on a section collision', async () => {
    getExternalConfigsMock.mockResolvedValue({
      sender1: {
        active: true,
        config: '[local]\naws_account_id = 2\nrole_name = external',
        updatedAt: 0,
      },
    });
    expect(await getMappedConfig('')).toEqual([
      {aws_account_id: '111111111111', role_name: 'local', title: 'local'},
    ]);
  });

  it('resolves source profiles across configs', async () => {
    getExternalConfigsMock.mockResolvedValue({
      sender1: {
        active: true,
        config: '[org]\naws_account_id = org\ntarget_role_name = shared',
        updatedAt: 0,
      },
    });
    getConfigMock.mockResolvedValue(`
[child]
aws_account_id = 111111111111
source_profile = org
`);
    expect(await getMappedConfig('')).toEqual([
      {
        aws_account_id: '111111111111',
        role_name: 'shared',
        source_profile_account_id: 'org',
        title: 'child',
      },
    ]);
  });
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
