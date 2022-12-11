import { mapConfigStateToGroups } from "./util";

it('should group items by \'group\'', () => {
  const config = [{
    foo: '1',
    group: 'foo'
  }, {
    foo: '1',
    group: 'foo'
  }, {
    foo: '1',
    group: 'bar'
  }];

  const grouped = mapConfigStateToGroups(config as unknown as AWSConfigItemState[]);
  expect(grouped).toMatchInlineSnapshot(`
[
  {
    "children": [
      {
        "foo": "1",
        "group": "foo",
      },
      {
        "foo": "1",
        "group": "foo",
      },
    ],
    "title": "foo",
  },
  {
    "children": [
      {
        "foo": "1",
        "group": "bar",
      },
    ],
    "title": "bar",
  },
]
`);
});
