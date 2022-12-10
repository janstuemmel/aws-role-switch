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
Object {
  "bar": Array [
    Object {
      "foo": "1",
      "group": "bar",
    },
  ],
  "foo": Array [
    Object {
      "foo": "1",
      "group": "foo",
    },
    Object {
      "foo": "1",
      "group": "foo",
    },
  ],
}
`);
});
