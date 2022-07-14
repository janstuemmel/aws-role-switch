#!/usr/bin/env -S TS_NODE_TRANSPILE_ONLY=true npx ts-node

import { build } from 'esbuild';

import { mergeJsons } from '../src/build/plugins';
import {
  pagesConfig,
  scriptsConfig,
} from '../src/build/config';

const watch = !!process.argv.includes('--watch');
const minify = !!process.argv.includes('--minify');

build({
  ...pagesConfig,
  watch,
  minify,
  plugins: [
    ...pagesConfig.plugins || [],
    mergeJsons([
      'src/manifest.json',
      'src/manifest.firefox.json'
    ]),
  ],
  outdir: 'dist/firefox',
});

build({
  ...pagesConfig,
  watch,
  minify,
  plugins: [
    ...pagesConfig.plugins || [],
    mergeJsons([
      'src/manifest.json',
      'src/manifest.chrome.json'
    ]),
  ],
  outdir: 'dist/chrome',
});

build({
  ...scriptsConfig,
  watch,
  outdir: 'dist/firefox'
});

build({
  ...scriptsConfig,
  watch,
  outdir: 'dist/chrome'
});
