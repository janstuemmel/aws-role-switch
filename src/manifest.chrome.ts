import common from './manifest.common';
import awsConsoleUrls from './common/const/awsConsoleUrls';

export default {
  ...common,
  manifest_version: 3,
  // eslint-disable-next-line max-len
  key: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgnHPyBhEZkOldk+CWmlMdZce8J0T9DncdNf0grdCdf/I0lb87ryMXXPgWcyaBTIKWA/vEQvP/I8Fy/Y/8+SzzdiQv4b13H1IjsTpR3xQ5Jv+WmLVeAilNrFR9wS3q7PrId3UzoUG3qVflC9e/Mzd6SlB0tbMeZtmFWsyvgorMlvelLlLJ/m1Pjqhr4q8DQeSXLPM8sHY+9t3yhJoujuE7XS315Dy8ERrsL1uWi1URRvlYnO7a7hR3ZLwNwL9h4OFvY9cAnlvwG7pjn24duVGB6F5mOEe9nqWkpW86wDK+NTq8tzGYDt6vAMMghJMwuAUrgLn0gyB7kxA5ApoUnltBwIDAQAB',
  action: {
    default_title: "AWS role switch",
    default_popup: "popup/popup.html",
    browser_style: true,
    default_icon: {
      128: "assets/icon128.png"
    }
  },
  permissions: [
    "storage",
    "cookies",
  ],
  host_permissions: [
    ...awsConsoleUrls,
  ],
  commands: {
    _execute_action: {
      description: "Open the popup window",
      suggested_key: {
        default: "Ctrl+Shift+L"
      }
    }
  },
  background: {
    service_worker: "background/background.js"
  },
};
