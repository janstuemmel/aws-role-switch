type Args = Pick<SwitchRoleForm, 'csrf' | 'redirect_uri' | '_fromAWSRoleSwitchExtension'>

const createRedirectUrl = (redirectUrl: string, region?: string) => {
  try {
    const url = new URL(redirectUrl);
    const actualRegion = url.searchParams.get('region') || 'us-east-1';
    url.searchParams.set('region', region || actualRegion);
    return url.toString();
  } catch(_) {
    return redirectUrl;
  }
};

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
  redirect_uri: createRedirectUrl(args.redirect_uri, configItem.region),
});
