import browser from 'webextension-polyfill'

export async function getConfig(): Promise<string> {
  return browser.storage.sync.get(['configFile'])
    .then(({ configFile }) => configFile)
}

export async function setConfig(configFile: string) {
  return browser.storage.sync.set({ configFile })
}
