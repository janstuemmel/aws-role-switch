type Args = Pick<SwitchRoleForm, 'csrf' | 'redirect_uri' | '_fromAWSRoleSwitchExtension'>
type AccountRole = {roleName: string, account: string}
export const mapToSwitchForm = (
  configItem: AWSConfigItem, 
  args: Args,
): SwitchRoleForm => {
    
  const accountAndRoleName = accountAndRoleNameFromConfigItem(configItem);
  return ({
    ...accountAndRoleName,
    color: configItem.color?.replace('#', ''),
    displayName: `${configItem.title} | ${accountAndRoleName.account}`.slice(0, 64),
    action: 'switchFromBasis',
    mfaNeeded: '0',
    ...args,
  });
};

const emptyRoleAccount = {roleName: '', account:''};

export const accountAndRoleNameFromConfigItem = (ci: AWSConfigItem) : AccountRole => {

  if (ci.aws_account_id && ci.role_name) {
    return {account: ci.aws_account_id, roleName: ci.role_name};
  }
  if (ci.role_arn) {
    return extractAccountAndRoleFromRoleARN(ci.role_arn);
  }
  return emptyRoleAccount;
};

export const extractAccountAndRoleFromRoleARN = (roleArn: string) : AccountRole =>  {
  const arnRoleRe = /^arn:aws:iam::(?<account>\d{12}):role\/(?<roleName>\w+)/;
  const match = roleArn.trim().match(arnRoleRe);

  if (match?.groups) {
    return {roleName : match.groups.roleName, account: match.groups.account};
  }
  
  return emptyRoleAccount;
};
