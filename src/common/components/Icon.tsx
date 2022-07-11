import React, { FC } from 'react';

export const Icon: FC<{ src: string, size: number }> = ({ src, size = 24 }) => {
  return <img src={src} className="bp4-icon" width={size} height={size} />;
};
