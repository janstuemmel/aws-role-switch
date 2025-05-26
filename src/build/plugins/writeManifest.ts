import type {Plugin} from 'esbuild';

import fs from 'node:fs';
import path from 'node:path';

export const writeManifest = (manifest: object): Plugin => ({
  name: 'writeManifest',
  setup: (build) => {
    build.onEnd(async () => {
      const json = JSON.stringify(manifest, null, 2);
      await fs.promises.writeFile(
        path.join(
          process.cwd(),
          build.initialOptions.outdir ?? '',
          'manifest.json',
        ),
        json,
      );
    });
  },
});
