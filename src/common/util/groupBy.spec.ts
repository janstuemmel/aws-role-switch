import { groupBy } from "./groupBy";

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

  const grouped = groupBy(config, ['group']);
  expect(grouped).toMatchInlineSnapshot(`
{
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
