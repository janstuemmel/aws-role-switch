export {
  createTab,
  getCurrentTabId,
  sendToCurrentTab,
} from './tabs';

export {
  openOptions,
  addMessageListener,
} from './runtime';

export {
  getItems as getStorageItems,
  setItems as setStorageItems,
  getSize as getStorageSize,
  MAX_ITEM_COUNT as STORAGE_MAX_ITEM_COUNT,
  MAX_ITEM_SIZE as STORAGE_MAX_ITEM_SIZE,
  MAX_TOTAL_SIZE as STORAGE_MAX_TOTAL_SIZE
} from './storage';
