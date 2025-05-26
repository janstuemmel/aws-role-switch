import awsConsoleUrls from './common/const/awsConsoleUrls';
import common from './manifest.common';

export default {
  ...common,
  manifest_version: 3,
  action: {
    default_title: 'AWS role switch',
    default_popup: 'popup/popup.html',
    browser_style: true,
    default_icon: {
      128: 'assets/icon128.png',
    },
  },
  permissions: ['storage', 'cookies'],
  host_permissions: [...awsConsoleUrls],
  commands: {
    _execute_action: {
      description: 'Open the popup window',
      suggested_key: {
        default: 'Ctrl+Shift+L',
      },
    },
  },
  background: {
    service_worker: 'background/background.js',
  },
};
