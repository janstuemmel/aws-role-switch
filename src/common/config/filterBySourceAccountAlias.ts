export const filterBySourceAccountAlias = (alias: string) => (config: AWSConfig) => {
  const hasSourceAccountAlias = !!config.find((configItem) => configItem.source_profile_account_id === alias);
  return config.filter((configItem: AWSConfigItem) => {
    return (
      !alias ||
      !hasSourceAccountAlias ||
      configItem.source_profile_account_id === alias
    );
  });
};
