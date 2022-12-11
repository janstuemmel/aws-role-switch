import { BuildOptions } from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
import { sassPlugin } from 'esbuild-sass-plugin';


const defaultConfig: BuildOptions = {
  bundle: true,
  target: 'ES2018',
  format: 'cjs',
  sourcemap: 'external',
  loader: {
    '.svg': 'file',
    '.md': 'file',
  },
  metafile: true,
};

export const pagesConfig: BuildOptions = {
  ...defaultConfig,
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
  ],
};

export const scriptsConfig: BuildOptions = {
  ...defaultConfig,
  minify: false,
  entryPoints: [
    'src/content/aws-console.ts',
    'src/content/aws-signin.ts',
    'src/background/background.ts',
  ],
};
