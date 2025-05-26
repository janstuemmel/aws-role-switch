import awsConsoleUrls from './common/const/awsConsoleUrls';
import common from './manifest.common';

export default {
  ...common,
  manifest_version: 2,
  browser_action: {
    default_title: 'AWS role switch',
    default_popup: 'popup/popup.html',
    browser_style: true,
    default_icon: {
      128: 'assets/icon128.png',
    },
  },
  permissions: ['storage', 'cookies', ...awsConsoleUrls],
  commands: {
    _execute_browser_action: {
      description: 'Open the popup window',
      suggested_key: {
        default: 'Ctrl+Shift+L',
      },
    },
  },
  background: {
    scripts: ['background/background.js'],
  },
  browser_specific_settings: {
    gecko: {
      id: '{31f7b254-7ac9-4f3a-ae3c-ef67ea153e4a}',
      strict_min_version: '58.0',
    },
  },
};
