import React from 'react';
import {
  Icon,
  MenuItem,
  MenuItemProps,
} from '@blueprintjs/core';

export const RoleItem = ({ title, aws_account_id, color, ...props}: AWSConfigItem & Partial<MenuItemProps>) => 
  <MenuItem {...props}
    icon={<Icon icon="full-circle" color={color} />} 
    text={title} 
    label={aws_account_id} />;
