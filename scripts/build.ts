#!/usr/bin/env -S TS_NODE_TRANSPILE_ONLY=true npx ts-node

import { build } from 'esbuild';

import { mergeJsons } from '../src/build/plugins';
import {
  pagesConfig,
  scriptsConfig,
} from '../src/build/config';
import fs from 'fs';

const watch = !!process.argv.includes('--watch');
const minify = !!process.argv.includes('--minify');

const result = build({
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

// write metadata for bundle analyzer
// npx esbuild-visualizer --metafile
result.then(r => {
  fs.writeFileSync('dist/metadata.json', JSON.stringify(r.metafile));
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
