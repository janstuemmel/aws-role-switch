import {
  addLocalStorageChangeListener,
  getLocalStorageItems,
  removeLocalStorageItems,
  setLocalStorageItems,
} from '../browser';

// one key per sender so concurrent pushes of two senders don't overwrite each other
const KEY_PREFIX = 'externalConfig_';

const toKey = (senderId: string) => `${KEY_PREFIX}${senderId}`;

export async function getExternalConfigs(): Promise<ExternalConfigs> {
  const items = await getLocalStorageItems(null);
  return Object.fromEntries(
    Object.entries(items)
      .filter(([key]) => key.startsWith(KEY_PREFIX))
      .map(([key, value]) => [key.slice(KEY_PREFIX.length), value]),
  ) as ExternalConfigs;
}

const getExternalConfig = async (senderId: string) => {
  const items = await getLocalStorageItems([toKey(senderId)]);
  return items[toKey(senderId)] as ExternalConfig | undefined;
};

// a new sender stays inactive until approved in the options page
export async function saveExternalConfig(
  senderId: string,
  config: string,
): Promise<ExternalConfig> {
  const active = (await getExternalConfig(senderId))?.active ?? false;
  const saved = {active, config, updatedAt: Date.now()};
  await setLocalStorageItems({[toKey(senderId)]: saved});
  return saved;
}

export async function setExternalConfigActive(
  senderId: string,
  active: boolean,
) {
  const current = await getExternalConfig(senderId);
  if (current) {
    await setLocalStorageItems({[toKey(senderId)]: {...current, active}});
  }
}

export async function removeExternalConfig(senderId: string) {
  await removeLocalStorageItems([toKey(senderId)]);
}

// fires on pushes from senders as well as on approval changes, returns the unsubscribe function
export function onExternalConfigsChanged(cb: () => void) {
  return addLocalStorageChangeListener((changes) => {
    if (Object.keys(changes).some((key) => key.startsWith(KEY_PREFIX))) cb();
  });
}
