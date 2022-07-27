type Args = Pick<SwitchRoleForm, 'csrf' | 'redirect_uri' | '_fromAWSRoleSwitchExtension'>

export const mapToSwitchForm = (
  configItem: AWSConfigItem, 
  args: Args,
): SwitchRoleForm => ({
    account: configItem.aws_account_id,
    roleName: configItem.role_name,
    color: configItem.color?.replace('#', ''),
    displayName: `${configItem.title} | ${configItem.aws_account_id}`.slice(0, 64),
    action: 'switchFromBasis',
    mfaNeeded: '0',
    ...args,
  });
