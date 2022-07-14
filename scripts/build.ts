#!/usr/bin/env -S TS_NODE_TRANSPILE_ONLY=true npx ts-node

import { build } from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
import { sassPlugin } from 'esbuild-sass-plugin';

const watch = false;
const minify = false;

// popup and options page
build({
  entryPoints: [
    'src/popup/popup.tsx',
    'src/popup/popup.scss',
    // 'src/options/options.tsx',
    // 'src/options/options.scss',
  ],
  loader: {
    '.svg': 'file',
    '.md': 'file',
  },
  watch,
  minify,
  bundle: true,
  outdir: 'dist',
  format: 'cjs',
  sourcemap: 'external',
  plugins: [
    sassPlugin(),
    copy({
      assets: [{
        from: ['./src/manifest.json'],
        to: ['.'],
      }, {
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
  entryPoints: [
    'src/content/aws-console.ts',
    'src/content/aws-signin.ts',
    'src/background/background.ts',
  ],
  watch,
  bundle: true,
  outdir: 'dist',
  target: 'ES2018',
  format: 'cjs',
  sourcemap: 'external',
  // do not minify background/content scripts for readability
  minify: false,
});
