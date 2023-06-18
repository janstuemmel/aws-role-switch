import common from './manifest.common';

export default {
  ...common,
  background: {
    service_worker: "background/background.js",
  },
};
