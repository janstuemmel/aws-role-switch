declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.md" {
  const content: string;
  export default content;
}

type AWSConfigItem = {
  title: string,
  aws_account_id: string,
  role_name: string,
  color?: string,
  region?: string,
  group?: z.string,
}
type AWSConfig = AWSConfigItem[]
type AWSConfigItemState = AWSConfigItem & { selected: boolean }

type StoredConfigItem = Omit<AWSConfigItem, 'title'>
type StoredConfig = Record<string, StoredConfigItem>

type SwitchRoleFormFromExtension = { _fromAWSRoleSwitchExtension?: 'true' }
type SwitchRoleForm = {
  account: string,
  roleName: string,
  color?: string,
  displayName?: string,
  
  action: 'switchFromBasis',
  mfaNeeded: '0',
  redirect_uri: string // default https://console.aws.amazon.com/console,
  
  csrf?: string,
} & SwitchRoleFormFromExtension

type ContentScriptSwitchMessage = { type: 'switch' } & AWSConfigItem
type BackgroundScriptRedirectMessage = { type: 'redirect' } & AWSConfigItem;
type Message = ContentScriptSwitchMessage | BackgroundScriptRedirectMessage;
