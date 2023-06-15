declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.md" {
  const content: string;
  export default content;
}

type AWSConfigOptionalData = {
  color?: string,
  region?: string,
  group?: string,
}

type AWSConfigItem = {
  title: string,
  aws_account_id: string,
  role_name: string,
  selected?: boolean,
} & AWSConfigOptionalData

type AWSConfig = AWSConfigItem[]
type AWSConfigItemState = AWSConfigItem & { selected: boolean }

type AWSStoredConfigItem = {
  aws_account_id?: string,
  role_name?: string,
  role_arn?: string,
  source_profile?: string,
  target_role_name?: string,
} & AWSConfigOptionalData

type StoredConfig = Record<string, AWSStoredConfigItem>

type SwitchRoleFormFromExtension = { _fromAWSRoleSwitchExtension?: 'true' }
type SwitchRoleForm = {
  account: string,
  roleName?: string,
  region?: string,
  color?: string,
  displayName?: string,
  
  action: 'switchFromBasis',
  mfaNeeded: '0',
  redirect_uri: string // default https://console.aws.amazon.com/console,
  
  csrf?: string,
} & SwitchRoleFormFromExtension

type ContentScriptSwitchMessage = { type: 'switch' } & AWSConfigItem
type BackgroundScriptRedirectMessage = { type: 'redirect' } & AWSConfigItem;
type BackgroundScriptGetConfigMessage = { type: 'getConfig' };
type Message = 
  ContentScriptSwitchMessage | 
  BackgroundScriptRedirectMessage | 
  BackgroundScriptGetConfigMessage;
