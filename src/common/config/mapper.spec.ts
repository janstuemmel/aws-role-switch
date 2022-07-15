import { mapConfig } from "./mapper";

it('should map to default group', () => {
  const stored = {
    'foo': {
      aws_account_id: 'foo',
      role_name: 'bar'
    },
    'profile bar': {
      aws_account_id: 'foo',
      role_name: 'bar'
    },
  } as StoredConfig;
  const config = mapConfig(stored);
  expect(config).toMatchInlineSnapshot(`
Array [
  Object {
    "aws_account_id": "foo",
    "color": undefined,
    "role_name": "bar",
    "title": "bar",
  },
  Object {
    "aws_account_id": "foo",
    "color": undefined,
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
    "role_name": "bar",
    "title": "foo",
  },
  Object {
    "aws_account_id": "foo",
    "color": undefined,
    "group": "baz",
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
    "role_name": "ccc",
    "title": "foo",
  },
  Object {
    "aws_account_id": "foo",
    "color": undefined,
    "group": "aaa",
    "role_name": "bar",
    "title": "bar",
  },
  Object {
    "aws_account_id": "foo",
    "color": undefined,
    "group": "bbb",
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
    "role_name": "bar",
    "title": "bar",
  },
]
`);
});


it('should cort correctly', () => {
  const stored = {
    'foo': {
      aws_account_id: 'foo',
      role_name: 'bar',
      group: 'b',
    },
    'foo2': {
      aws_account_id: 'foo',
      role_name: 'bar',
      group: 'b',
    },
    'bar': {
      aws_account_id: 'foo',
      role_name: 'bar',
      group: 'a',
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
    "role_name": "bar",
    "title": "bar2",
  },
  Object {
    "aws_account_id": "foo",
    "color": undefined,
    "group": "a",
    "role_name": "bar",
    "title": "bar",
  },
  Object {
    "aws_account_id": "foo",
    "color": undefined,
    "group": "b",
    "role_name": "bar",
    "title": "foo",
  },
  Object {
    "aws_account_id": "foo",
    "color": undefined,
    "group": "b",
    "role_name": "bar",
    "title": "foo2",
  },
]
`);
});
