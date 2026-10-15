// the first config defining a section wins, sections keep their order
export function mergeConfigs(...configs: StoredConfig[]): StoredConfig {
  return configs.reduce(
    (merged, config) => ({
      ...merged,
      ...Object.fromEntries(
        Object.entries(config).filter(([section]) => !(section in merged)),
      ),
    }),
    {} as StoredConfig,
  );
}
