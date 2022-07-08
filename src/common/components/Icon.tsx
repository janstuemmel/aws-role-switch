import React, { FC } from 'react';

export const Icon: FC<{ src: string }> = ({ src }) => {
  return <img src={src} className="bp4-icon" />
};
