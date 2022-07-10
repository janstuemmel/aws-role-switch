# aws role switch

A browser plugin to quickly switch between aws roles.

**Features:**
  * Role editor (`codemirror`)
  * Group roles
  * AWS Config `ini` format
  * Config is synced between devices
  * Config is stored in sync storage as a gzipped base64 string (~200 entries possible)
  * Open popup via hotkey: `Ctrl-Shift-l`
  * Navigate via arrow keys between roles, press `Enter` to assume a role
  * Neat dark/light theme based on your browser settings

## Screenshots

![](./docs/popup-dark-light.png)
<br />
![](./docs/popup-search.png)

## Development

```sh
npm i
npm start # start dev server
npm bundle # build distribution zip
```
