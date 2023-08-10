import {
  context,
  BuildOptions,
} from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
import { sassPlugin } from 'esbuild-sass-plugin';

import { writeManifest } from "./plugins";
import manifestFirefox from '../manifest.firefox';
import manifestChrome from '../manifest.chrome';
type Target = 'firefox' | 'chrome';

const defaultConfig: BuildOptions = {
  bundle: true,
  target: 'es2017',
  format: 'cjs',
  sourcemap: 'external',
  loader: {
    '.svg': 'file',
    '.md': 'file',
  },
  metafile: true,
};

const buildPages = (target: Target, minify: boolean) => context({
  ...defaultConfig,
  minify,
  outdir: `dist/${target}`,
  entryPoints: [
    'src/popup/popup.tsx',
    'src/popup/popup.scss',
    'src/options/options.tsx',
    'src/options/options.scss',
  ],
  plugins: [
    sassPlugin(),
    copy({
      assets: [{
        from: ['src/assets/*'],
        to: ['./assets']
      }, {
        from: ['src/**/*.html'],
        to: ['.']
      }],
    }),
    writeManifest(target === 'firefox' ? manifestFirefox : manifestChrome),
  ],
});

const buildScripts = (target: Target) => context({
  minify: false,
  entryPoints: [
    'src/content/aws-console.ts',
    'src/content/aws-signin.ts',
    'src/background/background.ts',
  ],
  outdir: `dist/${target}`
});

export const watch = async (target: Target, minify: boolean) => {
  const ctxs = await Promise.all([buildPages(target, minify), buildScripts(target)]);
  return await Promise.all(ctxs.map(ctx => ctx.watch()));
};

export const build = async (target: Target, minify: boolean) => {
  const ctxs = await Promise.all([buildPages(target, minify), buildScripts(target)]);
  await Promise.all(ctxs.map(ctx => ctx.rebuild()));
  ctxs.forEach(ctx => ctx.dispose());
};
