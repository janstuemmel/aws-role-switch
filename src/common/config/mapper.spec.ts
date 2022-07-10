import { StoredConfig } from "../../types";
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
    "group": "baz",
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
