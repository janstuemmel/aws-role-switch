# AWS Role Switch

[![](https://img.shields.io/chrome-web-store/v/mjgccddjodbakimbncbmobdgpmoddalc?style=flat-square)](https://chrome.google.com/webstore/detail/aws-role-switch/mjgccddjodbakimbncbmobdgpmoddalc)
[![](https://img.shields.io/amo/v/aws-role-switch?style=flat-square)](https://addons.mozilla.org/de/firefox/addon/aws-role-switch/)


Browser plugin to quickly switch between roles on the AWS console. This plugin shows a popup with aws roles you configured via a config ini file. It can be triggered via a keyboard combination, a role can then be selected via up and down arrow keys.  

* [Firefox plugin](https://addons.mozilla.org/addon/aws-role-switch/)
* [Chrome plugin](https://chrome.google.com/webstore/detail/aws-role-switch/mjgccddjodbakimbncbmobdgpmoddalc)
* [Docs](docs)

## Features  
  * Edit your roles in a `./aws/config` style `ini` format via a code editor
  * Store ~2k roles
  * Group roles together
  * Sync config via `sync` storage on different devices
  * Open popup via <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>l</kbd>
  * Navigate through roles with arrow keys, press enter to assume
  * Neat dark/light theme based on your browser settings

## Why 

You can store up to 5 roles in the AWS console. If you have a bunch of roles over many accounts this browser plugin might be a good choice to store your roles. It can store roughly 2000 roles and syncs it with browsers on other devices. 

You might also checkout [tilfinltd/aws-extend-switch-roles](https://github.com/tilfinltd/aws-extend-switch-roles) which is another browser plugin to switch roles. When i started to write this plugin i learned a lot of how the *switching* works. Originally i intended to contribute to this repository because i needed some features that aren't implemented there. However, it's written in a very oldschool style of Javascript, so i decided to rewrite it and give it a modern paint. 

## Development & Build

Please look at the [Developer documentation](docs/build.md)
