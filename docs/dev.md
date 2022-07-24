# Development 

## Sandboxed firefox/chrome

To get started easily it's possible to bundle the source code on the fly when a file changes and start a sandboxed firefox browser to view the changes:

```bash
# rebuilds dist folder on file change
npm run clean
npm run watch 

# start a sandboxed firefox or chrome with the extension installed
npm run ext:run:firefox 
npm run ext:run:chrome
```

## Chrome

You could also start a chrome browser and add the dist folder as a development extension. 

1. Run `npm run watch`
1. Open chrome extensions: `Settings > Extension` or enter `chrome://extensions/`
1. Enable `Developer mode` in the top right corner
1. Click `Load unpacked` in the top left corner and select `./dist` folder

This setup will work with autoreloading the options page on file change and will persist your aws config.

## Libraries

The plugin is written with following technologies:

* [esbuild](https://esbuild.github.io/)
* [typescript](https://www.typescriptlang.org/)
* [react](https://reactjs.org/) 
* [codemirror](https://codemirror.net/)
* [blueprint ui](https://blueprintjs.com/docs/)
