// the first config defining a section wins: later configs lose that section
export function dedupeSections(configs: StoredConfig[]): StoredConfig[] {
  const seen = new Set<string>();
  return configs.map((config) => {
    const kept = Object.fromEntries(
      Object.entries(config).filter(([section]) => !seen.has(section)),
    );
    Object.keys(kept).forEach((section) => seen.add(section));
    return kept;
  });
}

// sections keep their order
export function mergeConfigs(...configs: StoredConfig[]): StoredConfig {
  return Object.assign({}, ...dedupeSections(configs));
}
