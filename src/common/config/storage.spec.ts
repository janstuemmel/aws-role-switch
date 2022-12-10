import {
  getConfig,
  setConfig,
} from './storage';
import {
  getStorageItems,
  setStorageItems,
} from '../browser';
import { compressConfig } from './gzip';
import { mock } from '../../test/helper';

jest.mock('../browser');

beforeEach(() => {
  mock(getStorageItems).mockClear();
  mock(setStorageItems).mockClear();
});

it('get undefined config file', async () => {
  mock(getStorageItems).mockResolvedValue({});
  const config = await getConfig();
  expect(config).toBeUndefined();
});

it('get config file', async () => {
  mock(getStorageItems).mockResolvedValue({
    configFile: compressConfig('dummy'),
    configFile_2: undefined,
    configFile_3: undefined,
  });
  const config = await getConfig();
  expect(config).toEqual('dummy');
});

it('set config file', async () => {
  await setConfig(`
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
    sed diam nonumy eirmod tempor invidunt ut labore et dolore
    magna aliquyam erat, sed diam voluptua. At vero eos et 
    accusam et justo duo dolores et ea rebum. Stet clita kasd
    gubergren, no sea takimata sanctus est Lorem ipsum dolor 
  `);
  expect((setStorageItems as jest.Mock).mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    Object {
      "configFile": "eNptkEFuwzAMBO95xT7AyB9y760",
      "configFile_1": "voCXCUCOKjkgayO9Lu0VP5ZHYma",
      "configFile_2": "V0Q86HTha03UJQteuENQcJ+4Kiw",
      "configFile_3": "9jZI5dUM1Pa2MC9+VxwO2njitpI",
      "configFile_4": "MHSEvMFtilY4y56mNo5WYzjC0Wn",
      "configFile_5": "NJrD/tPCFC22DQL294p0SnpStf8",
      "configFile_6": "5De+wedMfDcfBUsNppuFgqJeyEH",
      "configFile_7": "F9hrqihv+4rxITJa8gdn/kElLya",
      "configFile_8": "8CSrF73FynObPJY8PSsJTs8mlBm",
      "configFile_9": "jUTzSYf7P7yT9DbtJa0w=",
    },
  ],
]
`);
});
