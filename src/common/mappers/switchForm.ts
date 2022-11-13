type Args = Pick<SwitchRoleForm, 'csrf' | 'redirect_uri' | '_fromAWSRoleSwitchExtension'>

const availableRegions = [
  "us-east-2",
  "us-east-1",
  "us-west-1",
  "us-west-2",
  "af-south-1",
  "ap-east-1",
  "ap-southeast-3",
  "ap-south-1",
  "ap-northeast-3",
  "ap-northeast-2",
  "ap-southeast-1",
  "ap-southeast-2",
  "ap-northeast-1",
  "ca-central-1",
  "eu-central-1",
  "eu-west-1",
  "eu-west-2",
  "eu-south-1",
  "eu-west-3",
  "eu-north-1",
  "eu-central-2",
  "me-south-1",
  "me-central-1",
  "sa-east-1",
  "us-gov-east-1",
  "us-gov-west-1"
];

const createRedirectUrl = (redirectUrl: string, region?: string) => {
  try {
    const url = new URL(redirectUrl);
    const actualRegion = url.searchParams.get('region') || 'us-east-1';
    const regionTo = region && availableRegions.includes(region) ? region : actualRegion;
    url.searchParams.set('region', regionTo);
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
