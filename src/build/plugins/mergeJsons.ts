import { Plugin } from 'esbuild';

import path from 'path';
import fs from 'fs';

const getPath = (fileName: string) => path.join(process.cwd(), fileName);

const readJsonFiles = (files: string[]) => 
  files.map((f) => fs.promises.readFile(getPath(f), 'utf8').then(JSON.parse));

export const onBuildEnd = (jsonPaths: string[], outdir: string) => async () => {
  const files = await Promise.allSettled(readJsonFiles(jsonPaths))
    .then(res => res.filter((item) => item.status !== 'rejected') as PromiseFulfilledResult<object>[])
    .then(res => res.map((item) => item.value));
  if (jsonPaths.length > 0) {
    const json = JSON.stringify(Object.assign({}, ...files), null, 2);
    const fileName = path.basename(jsonPaths[0]);
    await fs.promises.writeFile(path.join(process.cwd(), outdir || '', fileName), json);
  }
};

export const mergeJsons = (jsonPaths: string[]): Plugin => ({
  name: 'mergeJsonsPlugin',
  setup: (build) => {
    build.onEnd(onBuildEnd(jsonPaths, build.initialOptions.outdir || ''));
  },
});
