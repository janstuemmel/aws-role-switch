import React, {type FC} from 'react';

export const Icon: FC<{src: string; size?: number}> = ({src, size = 24}) => {
  return (
    <img alt="" src={src} className="bp5-icon" width={size} height={size} />
  );
};
