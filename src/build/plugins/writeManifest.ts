import { Plugin } from 'esbuild';

import path from 'path';
import fs from 'fs';

export const writeManifest = (manifest: object): Plugin => ({
  name: 'writeManifest',
  setup: (build) => {
    build.onEnd(async () => {
      const json = JSON.stringify(manifest, null, 2);
      await fs.promises.writeFile(
        path.join(
          process.cwd(), 
          build.initialOptions.outdir || '', 
          'manifest.json'
        ),
        json,
      );      
    });
  },
});
