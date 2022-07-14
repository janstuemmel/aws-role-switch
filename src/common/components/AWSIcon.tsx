import React, { FC } from "react";

import { Icon } from "./Icon";

export const AWSIcon: FC<{ theme: 'light' | 'dark' }> = ({ theme = 'light' }) => {
  return <Icon src={theme === 'light' ? '/assets/aws-light.svg' : '/assets/aws-dark.svg'} />;
};
