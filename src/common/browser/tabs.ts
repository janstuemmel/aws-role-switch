import { tabs } from "webextension-polyfill";

export const createTab = async (url: string, active: boolean = true, cb: () => void = () => {}) => {
  return tabs.create({
    active,
    url
  }).then(cb)
};

export async function getCurrentTab() {
  return tabs.query({
    active: true,
    currentWindow: true,
  }).then((tabs) => tabs[0])
}
