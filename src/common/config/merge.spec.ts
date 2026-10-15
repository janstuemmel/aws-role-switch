import {mergeConfigs} from './merge';

it('keeps sections of every config in order', () => {
  expect(Object.keys(mergeConfigs({a: {}, b: {}}, {c: {}}, {d: {}}))).toEqual([
    'a',
    'b',
    'c',
    'd',
  ]);
});

it('keeps the first section on a collision', () => {
  expect(
    mergeConfigs(
      {role: {role_name: 'local'}},
      {role: {role_name: 'external'}, other: {role_name: 'external'}},
    ),
  ).toEqual({
    role: {role_name: 'local'},
    other: {role_name: 'external'},
  });
});
