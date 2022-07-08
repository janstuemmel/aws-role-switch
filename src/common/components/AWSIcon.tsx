import React, { FC } from "react";
import { Icon } from "./Icon";

import awsIconDark from '../../assets/aws-dark.svg'
import awsIconLight from '../../assets/aws-light.svg'

export const AWSIcon: FC<{ theme: 'light' | 'dark' }> = ({ theme = 'light' }) => {
  return <Icon src={theme === 'light' ? awsIconLight : awsIconDark} />
}