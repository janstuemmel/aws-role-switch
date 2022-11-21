import awsConsoleUrls from './common/const/awsConsoleUrls';
import { version } from '../package.json';

export default {
  version: version,
  name: "AWS role switch",
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
  ]
};
