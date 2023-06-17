export {
  createTab,
  getCurrentTab,
  sendToCurrentAwsConsoleTab,
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

// helper when browser and chrome are not compatible
// this happens some times
// FIXME: remove when manifest v3 for firefox 
// is released and api are hopefully compatible 
export const browserOrChrome = () => typeof browser !== 'undefined' ? browser : chrome;
