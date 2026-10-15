import {mock} from '../../test/helper';
import {
  addLocalStorageChangeListener,
  getLocalStorageItems,
  removeLocalStorageItems,
  setLocalStorageItems,
} from '../browser';
import {
  getExternalConfigs,
  onExternalConfigsChanged,
  removeExternalConfig,
  saveExternalConfig,
  setExternalConfigActive,
} from './external';

jest.mock('../browser');

let store: Record<string, unknown>;

beforeEach(() => {
  store = {};
  jest.useFakeTimers().setSystemTime(1000);
  mock(getLocalStorageItems).mockImplementation(async (keys) =>
    keys === null
      ? {...store}
      : Object.fromEntries(
          keys.filter((key) => key in store).map((key) => [key, store[key]]),
        ),
  );
  mock(setLocalStorageItems).mockImplementation(async (items) => {
    Object.assign(store, items);
  });
  mock(removeLocalStorageItems).mockImplementation(async (keys) => {
    for (const key of keys) delete store[key];
  });
});

afterEach(() => {
  jest.useRealTimers();
});

it('stores the config of a new sender as inactive', async () => {
  const saved = await saveExternalConfig('sender1', '[role]');
  expect(saved).toEqual({active: false, config: '[role]', updatedAt: 1000});
  expect(await getExternalConfigs()).toEqual({
    sender1: {active: false, config: '[role]', updatedAt: 1000},
  });
});

it('keeps the approval of a known sender on update', async () => {
  await saveExternalConfig('sender1', '[role]');
  await setExternalConfigActive('sender1', true);
  jest.setSystemTime(2000);
  const saved = await saveExternalConfig('sender1', '[other-role]');
  expect(saved).toEqual({
    active: true,
    config: '[other-role]',
    updatedAt: 2000,
  });
});

it('lists only external configs', async () => {
  store.configFile_1 = 'not an external config';
  await saveExternalConfig('sender1', '[role1]');
  await saveExternalConfig('sender2', '[role2]');
  expect(Object.keys(await getExternalConfigs())).toEqual([
    'sender1',
    'sender2',
  ]);
});

it('ignores approval of an unknown sender', async () => {
  await setExternalConfigActive('unknown', true);
  expect(await getExternalConfigs()).toEqual({});
});

it('removes the config of a sender', async () => {
  await saveExternalConfig('sender1', '[role1]');
  await saveExternalConfig('sender2', '[role2]');
  await removeExternalConfig('sender1');
  expect(Object.keys(await getExternalConfigs())).toEqual(['sender2']);
});

describe('onExternalConfigsChanged', () => {
  const emitChange = (keys: string[]) => {
    const [[listener]] = mock(addLocalStorageChangeListener).mock.calls;
    listener(Object.fromEntries(keys.map((key) => [key, {}])));
  };

  beforeEach(() => {
    mock(addLocalStorageChangeListener).mockReset();
  });

  it('notifies when a sender config changes', () => {
    const cb = jest.fn();
    onExternalConfigsChanged(cb);
    emitChange(['externalConfig_sender1']);
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('ignores changes of other local items', () => {
    const cb = jest.fn();
    onExternalConfigsChanged(cb);
    emitChange(['somethingElse']);
    expect(cb).not.toHaveBeenCalled();
  });

  it('returns the unsubscribe function of the listener', () => {
    const unsubscribe = jest.fn();
    mock(addLocalStorageChangeListener).mockReturnValue(unsubscribe);
    expect(onExternalConfigsChanged(jest.fn())).toBe(unsubscribe);
  });
});
