import { z } from 'zod';

import {
  AWSConfigItem,
  SwitchRoleForm,
  SwitchRoleParamsSchema,
} from '../types';

const ArgsSchema = SwitchRoleParamsSchema.pick({
  _fromAWSRoleSwitchExtension: true,
  csrf: true,
  redirect_uri: true,
}).partial();

export const mapToSwitchForm = (
  configItem: AWSConfigItem, 
  args: z.infer<typeof ArgsSchema>,
): SwitchRoleForm => SwitchRoleParamsSchema.parse({
  account: configItem.aws_account_id,
  roleName: configItem.role_name,
  color: configItem.color?.replace('#', ''),
  displayName: `${configItem.title} | ${configItem.aws_account_id}`.slice(0, 64),
  ...args,
});
