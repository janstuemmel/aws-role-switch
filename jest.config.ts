import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: [
    '<rootDir>/src',
  ],
  verbose: true,
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};

export default config;
