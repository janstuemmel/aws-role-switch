import { StoredConfig } from "../../types";
import { mapConfig } from "./mapper";

it('should map to default group', () => {
  const stored = {
    'foo': {
      account: 'foo',
      roleName: 'bar'
    },
    'profile bar': {
      account: 'foo',
      roleName: 'bar'
    },
  }
  const config = mapConfig(stored)
  expect(config).toMatchInlineSnapshot(`
Object {
  "default": Array [
    Object {
      "account": "foo",
      "roleName": "bar",
      "title": "foo",
    },
    Object {
      "account": "foo",
      "roleName": "bar",
      "title": "bar",
    },
  ],
}
`)
});

it('should map to groups', () => {
  const stored = {
    'foo': {
      account: 'foo',
      roleName: 'bar'
    },
    'bar': {
      account: 'foo',
      roleName: 'bar',
      group: 'baz'
    },
  }
  const config = mapConfig(stored)
  expect(config).toMatchInlineSnapshot(`
Object {
  "baz": Array [
    Object {
      "account": "foo",
      "group": "baz",
      "roleName": "bar",
      "title": "bar",
    },
  ],
  "default": Array [
    Object {
      "account": "foo",
      "roleName": "bar",
      "title": "foo",
    },
  ],
}
`)
});

it('should omit entries with invalid values', () => {
  const stored = {
    'foo': {
      account: 'foo',
    },
    'bar': {
      account: 'foo',
      roleName: 'bar',
    },
    'baz': 1337,
  }
  const config = mapConfig(stored as object as StoredConfig)
  expect(config).toMatchInlineSnapshot(`
Object {
  "default": Array [
    Object {
      "account": "foo",
      "roleName": "bar",
      "title": "bar",
    },
  ],
}
`)
});
