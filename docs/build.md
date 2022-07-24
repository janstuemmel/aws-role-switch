# Build from source

## Required software

Node is required at a minimum version of 16. Download from [nodejs.org](https://nodejs.org/en/download/) or use a node version manager like [volta](https://volta.sh/) or [nvm](https://github.com/nvm-sh/nvm).

* Node `>=16` 
* NPM `>=8`

## Setup

```bash
# installs dependencies
npm install
```

## Build from source

To transpile typescript, bundle javascript and build the distribution zip's for browser market submission just type:

```bash
npm run bundle
```

You'll find the bundled source code and distribution zip's in `./dist` folder.