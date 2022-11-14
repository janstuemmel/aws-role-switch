import {
  mapConfig,
  extractAccountAndRoleFromRoleARN,
} from './mapper';

it('should map to default group', () => {
  const stored = {
    'foo': {
      aws_account_id: 'foo',
      role_name: 'bar'
    },
    'profile bar': {
      aws_account_id: 'foo',
      role_name: 'bar',
      region: 'us-east-1'
    },
    'baz': {
      role_arn: 'arn:aws:iam::123456789012:role/MyRole'
    }
  } as StoredConfig;
  const config = mapConfig(stored);
  expect(config).toMatchInlineSnapshot(`
Array [
  Object {
    "aws_account_id": "123456789012",
    "color": undefined,
    "region": undefined,
    "role_name": "MyRole",
    "title": "baz",
  },
  Object {
    "aws_account_id": "foo",
    "color": undefined,
    "region": "us-east-1",
    "role_name": "bar",
    "title": "bar",
  },
  Object {
    "aws_account_id": "foo",
    "color": undefined,
    "region": undefined,
    "role_name": "bar",
    "title": "foo",
  },
]
`);
});

it('should map to groups', () => {
  const stored = {
    'foo': {
      aws_account_id: 'foo',
      role_name: 'bar'
    },
    'bar': {
      aws_account_id: 'foo',
      role_name: 'bar',
      group: 'baz'
    },
  };
  const config = mapConfig(stored);
  expect(config).toMatchInlineSnapshot(`
Array [
  Object {
    "aws_account_id": "foo",
    "color": undefined,
    "region": undefined,
    "role_name": "bar",
    "title": "foo",
  },
  Object {
    "aws_account_id": "foo",
    "color": undefined,
    "group": "baz",
    "region": undefined,
    "role_name": "bar",
    "title": "bar",
  },
]
`);
});

it('should sort by groups', () => {
  const stored = {
    'foo': {
      aws_account_id: 'foo',
      role_name: 'ccc'
    },
    'bar': {
      aws_account_id: 'foo',
      role_name: 'bar',
      group: 'aaa'
    },
    'baz': {
      aws_account_id: 'foo',
      role_name: 'bar',
      group: 'bbb'
    },
  };
  const config = mapConfig(stored);
  expect(config).toMatchInlineSnapshot(`
Array [
  Object {
    "aws_account_id": "foo",
    "color": undefined,
    "region": undefined,
    "role_name": "ccc",
    "title": "foo",
  },
  Object {
    "aws_account_id": "foo",
    "color": undefined,
    "group": "aaa",
    "region": undefined,
    "role_name": "bar",
    "title": "bar",
  },
  Object {
    "aws_account_id": "foo",
    "color": undefined,
    "group": "bbb",
    "region": undefined,
    "role_name": "bar",
    "title": "baz",
  },
]
`);
});

it('should omit entries with invalid values', () => {
  const stored = {
    'foo': {
      aws_account_id: 'foo',
    },
    'bar': {
      aws_account_id: 'foo',
      role_name: 'bar',
    },
    'baz': 1337,
  };
  const config = mapConfig(stored as object as StoredConfig);
  expect(config).toMatchInlineSnapshot(`
Array [
  Object {
    "aws_account_id": "foo",
    "color": undefined,
    "region": undefined,
    "role_name": "bar",
    "title": "bar",
  },
]
`);
});

it('should map region', () => {
  const stored = {
    'foo': {
      aws_account_id: 'foo',
      role_name: 'bar',
      region: 'eu-central-1'
    },
  };
  const config = mapConfig(stored as object as StoredConfig);
  expect(config).toMatchInlineSnapshot(`
Array [
  Object {
    "aws_account_id": "foo",
    "color": undefined,
    "region": "eu-central-1",
    "role_name": "bar",
    "title": "foo",
  },
]
`);
});

it('should not map invalid region', () => {
  const stored = {
    'foo': {
      aws_account_id: 'foo',
      role_name: 'bar',
      region: 'us-dummy-1'
    },
  };
  const config = mapConfig(stored as object as StoredConfig);
  expect(config).toMatchInlineSnapshot(`
Array [
  Object {
    "aws_account_id": "foo",
    "color": undefined,
    "region": undefined,
    "role_name": "bar",
    "title": "foo",
  },
]
`);
});

it('should sort correctly', () => {
  const stored = {
    'foo': {
      aws_account_id: 'foo',
      role_name: 'bar',
      group: 'b',
    },
    'bar': {
      aws_account_id: 'foo',
      role_name: 'bar',
      group: 'a',
    },
    'foo2': {
      aws_account_id: 'foo',
      role_name: 'bar',
      group: 'b',
    },
    'bar2': {
      aws_account_id: 'foo',
      role_name: 'bar',
      group: undefined,
    },
  };
  const config = mapConfig(stored as object as StoredConfig);
  expect(config).toMatchInlineSnapshot(`
Array [
  Object {
    "aws_account_id": "foo",
    "color": undefined,
    "group": undefined,
    "region": undefined,
    "role_name": "bar",
    "title": "bar2",
  },
  Object {
    "aws_account_id": "foo",
    "color": undefined,
    "group": "b",
    "region": undefined,
    "role_name": "bar",
    "title": "foo",
  },
  Object {
    "aws_account_id": "foo",
    "color": undefined,
    "group": "b",
    "region": undefined,
    "role_name": "bar",
    "title": "foo2",
  },
  Object {
    "aws_account_id": "foo",
    "color": undefined,
    "group": "a",
    "region": undefined,
    "role_name": "bar",
    "title": "bar",
  },
]
`);
});

describe('Role ARN handling', () => {
  it("extracts role and account from a well formed role_arn", () => {
    const arnRole= "arn:aws:iam::123456789012:role/MyRole";
    const result = extractAccountAndRoleFromRoleARN(arnRole);
    const expected = {aws_account_id: '123456789012', role_name: 'MyRole'};
    
    expect(result).toEqual(expected);
  });
  it("returns undefined for a malformed role_arn", () => {
    const arnRole= "arn:aws:iam::123456:role/MyRole";
    const result = extractAccountAndRoleFromRoleARN(arnRole);
    
    expect(result).toEqual(undefined);
  });
}) ;
