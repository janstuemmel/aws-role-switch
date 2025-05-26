import {groupBy} from './groupBy';

it("should group items by 'group'", () => {
  const config = [
    {
      foo: '1',
      group: 'foo',
    },
    {
      foo: '1',
      group: 'foo',
    },
    {
      foo: '1',
      group: 'bar',
    },
    {
      foo: '1',
      group: undefined,
    },
  ];

  const grouped = groupBy(config, ['group']);
  expect(grouped).toMatchInlineSnapshot(`
{
  "": [
    {
      "foo": "1",
      "group": undefined,
    },
  ],
  "bar": [
    {
      "foo": "1",
      "group": "bar",
    },
  ],
  "foo": [
    {
      "foo": "1",
      "group": "foo",
    },
    {
      "foo": "1",
      "group": "foo",
    },
  ],
}
`);
});
