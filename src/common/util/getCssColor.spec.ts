import {getCssColor} from './getCssColor';

test.each([
  ['#ffffff1f', '#FFFFFF'],
  ['#ffffff', '#FFFFFF'],
  ['#fff', '#FFFFFF'],
  ['ffffff1f', '#FFFFFF'],
  ['ffffff', '#FFFFFF'],
  ['fff', '#FFFFFF'],
  ['white', '#FFFFFF'],
  ['noexist', undefined],
])('test color %s', (colorInput, colorOutput) => {
  const color = getCssColor(colorInput);
  expect(color).toBe(colorOutput);
});
