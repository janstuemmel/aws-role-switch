import {filterBySourceAccountAlias} from './filterBySourceAccountAlias';

it('should filter by source_profile_Account_id', () => {
  const config = filterBySourceAccountAlias('org1')([
    {
      title: 'role1',
      aws_account_id: '1234',
      role_name: 'foo',
      source_profile_account_id: 'org1',
    },
    {
      title: 'role1',
      aws_account_id: '1234',
      role_name: 'foo',
      source_profile_account_id: 'org1',
    },
    {
      title: 'role2',
      aws_account_id: '1234',
      role_name: 'foo',
      source_profile_account_id: 'org2',
    },
    {title: 'role3', aws_account_id: '1234', role_name: 'foo'},
  ]);
  expect(config).toMatchInlineSnapshot(`
[
  {
    "aws_account_id": "1234",
    "role_name": "foo",
    "source_profile_account_id": "org1",
    "title": "role1",
  },
  {
    "aws_account_id": "1234",
    "role_name": "foo",
    "source_profile_account_id": "org1",
    "title": "role1",
  },
]
`);
});

it('should return all roles when alias empty', () => {
  const config = filterBySourceAccountAlias('')([
    {
      title: 'role1',
      aws_account_id: '1234',
      role_name: 'foo',
      source_profile_account_id: 'org1',
    },
    {
      title: 'role1',
      aws_account_id: '1234',
      role_name: 'foo',
      source_profile_account_id: 'org1',
    },
    {
      title: 'role2',
      aws_account_id: '1234',
      role_name: 'foo',
      source_profile_account_id: 'org2',
    },
    {title: 'role3', aws_account_id: '1234', role_name: 'foo'},
  ]);
  expect(config).toMatchInlineSnapshot(`
[
  {
    "aws_account_id": "1234",
    "role_name": "foo",
    "source_profile_account_id": "org1",
    "title": "role1",
  },
  {
    "aws_account_id": "1234",
    "role_name": "foo",
    "source_profile_account_id": "org1",
    "title": "role1",
  },
  {
    "aws_account_id": "1234",
    "role_name": "foo",
    "source_profile_account_id": "org2",
    "title": "role2",
  },
  {
    "aws_account_id": "1234",
    "role_name": "foo",
    "title": "role3",
  },
]
`);
});

it('should return all when no alias match source_profile_Account_id', () => {
  const config = filterBySourceAccountAlias('')([
    {
      title: 'role1',
      aws_account_id: '1234',
      role_name: 'foo',
      source_profile_account_id: 'org1',
    },
    {
      title: 'role1',
      aws_account_id: '1234',
      role_name: 'foo',
      source_profile_account_id: 'org1',
    },
    {
      title: 'role2',
      aws_account_id: '1234',
      role_name: 'foo',
      source_profile_account_id: 'org2',
    },
    {title: 'role3', aws_account_id: '1234', role_name: 'foo'},
  ]);
  expect(config).toMatchInlineSnapshot(`
[
  {
    "aws_account_id": "1234",
    "role_name": "foo",
    "source_profile_account_id": "org1",
    "title": "role1",
  },
  {
    "aws_account_id": "1234",
    "role_name": "foo",
    "source_profile_account_id": "org1",
    "title": "role1",
  },
  {
    "aws_account_id": "1234",
    "role_name": "foo",
    "source_profile_account_id": "org2",
    "title": "role2",
  },
  {
    "aws_account_id": "1234",
    "role_name": "foo",
    "title": "role3",
  },
]
`);
});
