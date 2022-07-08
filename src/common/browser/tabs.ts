import { tabs } from "webextension-polyfill";

export const createTab = async (url: string, active: boolean = true, cb: () => void = () => {}) => {
  return await tabs.create({
    active,
    url
  }).then(cb)
};
