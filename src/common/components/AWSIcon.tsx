import React from 'react';

import {useColorScheme} from '../hooks';
import {Icon} from './Icon';

export const AWSIcon = () => {
  const theme = useColorScheme();
  return (
    <Icon
      src={theme === 'light' ? '/assets/aws-light.svg' : '/assets/aws-dark.svg'}
    />
  );
};
