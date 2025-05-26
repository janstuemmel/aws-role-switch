#!/usr/bin/env -S TS_NODE_TRANSPILE_ONLY=true npx tsx

import {
  build,
  watch,
} from '../src/build';

const watchArg = !!process.argv.includes('--watch');
const minifyArg = !!process.argv.includes('--minify');

const buildOrWatch = watchArg ? watch : build;

buildOrWatch('firefox', minifyArg);
buildOrWatch('chrome', minifyArg);
