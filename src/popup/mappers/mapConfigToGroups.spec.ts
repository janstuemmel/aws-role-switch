import { mapConfigToGroups } from "./mapConfigToGroups";

it('should map empty', () => {
  expect(mapConfigToGroups([])).toMatchInlineSnapshot(`[]`);
});

it('should map', () => {
  const groups = mapConfigToGroups([
    {title: 'foo1', aws_account_id: 'foo', role_name: 'bar', group: 'group1'},
    {title: 'foo2', aws_account_id: 'foo', role_name: 'bar', group: 'group1'},
    {title: 'foo3', aws_account_id: 'foo', role_name: 'bar', group: 'group2'},
    {title: 'foo4', aws_account_id: 'foo', role_name: 'bar'},
  ]);
  expect(groups).toMatchInlineSnapshot(`
[
  {
    "children": [
      {
        "aws_account_id": "foo",
        "group": "group1",
        "role_name": "bar",
        "title": "foo1",
      },
      {
        "aws_account_id": "foo",
        "group": "group1",
        "role_name": "bar",
        "title": "foo2",
      },
    ],
    "title": "group1",
  },
  {
    "children": [
      {
        "aws_account_id": "foo",
        "group": "group2",
        "role_name": "bar",
        "title": "foo3",
      },
    ],
    "title": "group2",
  },
  {
    "children": [
      {
        "aws_account_id": "foo",
        "role_name": "bar",
        "title": "foo4",
      },
    ],
    "title": "",
  },
]
`);
});

it('should map with filter', () => {
  const groups = mapConfigToGroups([
    {title: 'item1', aws_account_id: 'foo', role_name: 'foo', group: 'group1'},
    {title: 'item2', aws_account_id: 'bar', role_name: 'bar', group: 'group1'},
    {title: 'item3', aws_account_id: 'baz', role_name: 'baz', group: 'group2'},
    {title: 'item4', aws_account_id: 'bla', role_name: 'bla'},
  ], 'foo');
  expect(groups).toMatchInlineSnapshot(`
[
  {
    "children": [
      {
        "aws_account_id": "foo",
        "group": "group1",
        "role_name": "foo",
        "title": "item1",
      },
    ],
    "title": "group1",
  },
]
`);
});

it('should map with alias', () => {
  const groups = mapConfigToGroups([
    {title: 'item1', aws_account_id: 'foo', role_name: 'foo', source_profile_account_id: 'org1'},
    {title: 'item1', aws_account_id: 'bar', role_name: 'bar', source_profile_account_id: 'org1'},
    {title: 'item1', aws_account_id: 'bar', role_name: 'bar'},
  ], '', 'org1');
  expect(groups).toMatchInlineSnapshot(`
[
  {
    "children": [
      {
        "aws_account_id": "foo",
        "role_name": "foo",
        "source_profile_account_id": "org1",
        "title": "item1",
      },
      {
        "aws_account_id": "bar",
        "role_name": "bar",
        "source_profile_account_id": "org1",
        "title": "item1",
      },
    ],
    "title": "",
  },
]
`);
});

it('should map all items when no item has source account alias', () => {
  const groups = mapConfigToGroups([
    {title: 'item1', aws_account_id: 'foo', role_name: 'foo'},
    {title: 'item1', aws_account_id: 'bar', role_name: 'bar'},
  ], '', 'org1');
  expect(groups).toMatchInlineSnapshot(`
[
  {
    "children": [
      {
        "aws_account_id": "foo",
        "role_name": "foo",
        "title": "item1",
      },
      {
        "aws_account_id": "bar",
        "role_name": "bar",
        "title": "item1",
      },
    ],
    "title": "",
  },
]
`);
});
