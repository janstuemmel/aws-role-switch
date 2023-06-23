import { context } from 'esbuild';

import {
  pagesConfig,
  scriptsConfig,
} from './config';
import { writeManifest } from "./plugins";
import manifestFirefox from '../manifest.firefox';
import manifestChrome from '../manifest.chrome';

type Target = 'firefox' | 'chrome';

const buildPages = (target: Target, minify: boolean) => context({
  ...pagesConfig,
  minify,
  outdir: `dist/${target}`,  
  plugins: [
    ...pagesConfig.plugins ?? [],
    writeManifest(target === 'firefox' ? manifestFirefox : manifestChrome),
  ]
});

const buildScripts = (target: Target) => context({
  ...scriptsConfig,
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
