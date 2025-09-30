import {Button, Icon, MenuItem, type MenuItemProps} from '@blueprintjs/core';
import React, {useEffect, useState} from 'react';

export const RoleItem = ({
  title,
  aws_account_id,
  color,
  onClick,
  onCopyAccountId,
  selected,
  ...props
}: AWSConfigItem &
  Partial<MenuItemProps> & {
    onCopyAccountId?: () => void;
    selected?: boolean;
  }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCopyAccountId?.();
  };

  useEffect(() => {
    if (!isHovered) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

      // Mac: Cmd+C, Windows/Linux: Ctrl+Shift+C
      const shouldCopy = isMac
        ? e.metaKey && e.key === 'c' && !e.ctrlKey && !e.shiftKey
        : e.ctrlKey && e.shiftKey && e.key === 'c' && !e.metaKey;

      if (shouldCopy) {
        e.preventDefault();
        onCopyAccountId?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHovered, onCopyAccountId]);

  return (
    <MenuItem
      {...props}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      icon={<Icon icon="full-circle" color={color} />}
      text={title}
      labelElement={
        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          <span>{aws_account_id}</span>
          {isHovered && (
            <Button
              icon="duplicate"
              minimal
              small
              onClick={handleCopy}
            />
          )}
        </div>
      }
    />
  );
};
