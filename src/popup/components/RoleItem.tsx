import {Icon, MenuItem, type MenuItemProps} from '@blueprintjs/core';
import React from 'react';

export const RoleItem = ({
  title,
  aws_account_id,
  color,
  ...props
}: AWSConfigItem & Partial<MenuItemProps>) => (
  <MenuItem
    {...props}
    icon={<Icon icon="full-circle" color={color} />}
    text={title}
    label={aws_account_id}
  />
);
