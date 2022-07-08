import { runtime } from "webextension-polyfill"

export const openOptions = async (cb: () => void = () => {}) => {
  return await runtime.openOptionsPage().then(cb)
}
