import { z } from "zod";

export const IS_EXTENSION_KEY = '_fromAWSRoleSwitchExtension';

export const AWSConfigItemSchema = z.object({
  title: z.string(),
  aws_account_id: z.string(),
  role_name: z.string(),
  color: z.string().optional(),
  region: z.string().optional(),
  group: z.string().optional(),
});
export type AWSConfigItem = z.infer<typeof AWSConfigItemSchema>

export const AWSConfigSchema = z.array(AWSConfigItemSchema);
export type AWSConfig = z.infer<typeof AWSConfigSchema>

export const AWSConfigItemStateSchema = AWSConfigItemSchema.extend({ selected: z.boolean().optional() });
export type AWSConfigItemState = z.infer<typeof AWSConfigItemStateSchema>

export const StoredConfigItemSchema = AWSConfigItemSchema.omit({ title: true });
export type StoredConfigItem = z.infer<typeof StoredConfigItemSchema>

export const StoredConfigSchema = z.record(StoredConfigItemSchema);
export type StoredConfig = z.infer<typeof StoredConfigSchema> 

export const SwitchRoleParamsSchema = z.object({
  account: z.string(),
  roleName: z.string(),
  csrf: z.string().optional(),
  
  color: z.string().optional(),
  displayName: z.string().optional(),

  action: z.string().default('switchFromBasis'),
  mfaNeeded: z.string().default('0'),
  redirect_uri: z.string().default('https://console.aws.amazon.com/console'),

  [IS_EXTENSION_KEY]: z.literal('true').optional()
});

export type SwitchRoleForm = z.infer<typeof SwitchRoleParamsSchema>;

export type ContentScriptSwitchMessage = {
  type: 'switch',
} & AWSConfigItem

export type BackgroundScriptRedirectMessage = {
  type: 'redirect',
} & AWSConfigItem;

export type Message = ContentScriptSwitchMessage 
  | BackgroundScriptRedirectMessage;
