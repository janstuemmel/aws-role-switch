#!/usr/bin/env -S TS_NODE_TRANSPILE_ONLY=true npx ts-node

import {
  build,
  BuildOptions,
} from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
import { sassPlugin } from 'esbuild-sass-plugin';

import { mergeJsons } from '../src/common/build/esbuild-plugins';

const defaultOps: BuildOptions = {
  watch: !!process.argv.includes('--watch'),
  minify: !!process.argv.includes('--minify'),
  bundle: true,
  outdir: 'dist',
  target: 'ES2018',
  format: 'cjs',
  sourcemap: 'external',
  loader: {
    '.svg': 'file',
    '.md': 'file',
  },
};

// popup and options page
build({
  ...defaultOps,
  entryPoints: [
    'src/popup/popup.tsx',
    'src/popup/popup.scss',
    'src/options/options.tsx',
    'src/options/options.scss',
  ],
  plugins: [
    mergeJsons(['src/manifest.json', 'src/manifest.android.json']),
    sassPlugin(),
    copy({
      assets: [{
        from: ['src/assets/*'],
        to: ['./assets/*']
      }, {
        keepStructure: true,
        from: ['src/**/*.html'],
        to: ['.']
      }],
    }),
  ],
});

// content/background scripts
build({
  ...defaultOps,
  minify: false,
  entryPoints: [
    'src/content/aws-console.ts',
    'src/content/aws-signin.ts',
    'src/background/background.ts',
  ],
});
