import common from './manifest.common';

export default {
  ...common,
  background: {
    scripts: [
      "background/background.js"
    ]
  },
};
