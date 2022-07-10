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
    configFile: compressConfig('dummy')
  });
  const config = await getConfig();
  expect(config).toEqual('dummy');
});

it('set config file', async () => {
  const configFile = compressConfig('dummy');
  await setConfig('dummy');
  expect(setStorageItems).toHaveBeenCalledWith({ configFile });
});
