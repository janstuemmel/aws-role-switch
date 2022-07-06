import browser from 'webextension-polyfill'

// only for development
if (process.env.NODE_ENV !== 'production') {
  browser.management.getSelf().then(({ optionsUrl: url }) => {
    browser.tabs.create({ active: true, url })
  })
}
