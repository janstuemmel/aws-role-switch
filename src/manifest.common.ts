import awsConsoleUrls from './common/const/awsConsoleUrls';
import { version } from '../package.json';

export default {
  version: version,
  manifest_version: 3,
  name: "AWS role switch",
  action: {
    default_title: "AWS role switch",
    default_popup: "popup/popup.html",
    browser_style: true,
    default_icon: {
      128: "assets/icon128.png"
    }
  },
  commands: {
    _execute_action: {
      description: "Open the popup window",
      suggested_key: {
        default: "Ctrl+Shift+L"
      }
    }
  },
  permissions: [
    "storage",
    "cookies",
  ],
  host_permissions: [
    ...awsConsoleUrls,
  ],
  description: "Quickly switch between roles on the AWS console",
  homepage_url: "https://github.com/janstuemmel/aws-role-switch",
  options_ui: {
    page: "options/options.html",
    browser_style: false,
    open_in_tab: true
  },
  content_scripts: [
    {
      matches: [
        ...awsConsoleUrls,
      ],
      js: [
        "content/aws-console.js"
      ],
      run_at: "document_idle"
    },
    {
      matches: [
        "https://signin.aws.amazon.com/*"
      ],
      js: [
        "content/aws-signin.js"
      ],
      run_at: "document_idle"
    }
  ],
  browser_specific_settings: {
    gecko: {
      id: "{31f7b254-7ac9-4f3a-ae3c-ef67ea153e4a}",
      strict_min_version: "57.0"
    }
  },
};
