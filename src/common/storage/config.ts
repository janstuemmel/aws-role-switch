import browser from 'webextension-polyfill'

export async function getConfig(): Promise<{ config?: AWSConfig, configFile?: string }> {
  return browser.storage.sync.get(['config', 'configFile'])
    .then(({ config, configFile }) => ({ config, configFile }))
}

export async function setConfig(configFile: string, config: AWSConfig) {
  return browser.storage.sync.set({ configFile, config })
}
