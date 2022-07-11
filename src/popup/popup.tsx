import React,
{
  FC,
  useEffect,
  useRef,
} from 'react';
import { render } from 'react-dom';
import { Button } from '@blueprintjs/core/lib/esnext/components/button/buttons';
import { ControlGroup } from '@blueprintjs/core/lib/esnext/components/forms/controlGroup';
import { InputGroup } from '@blueprintjs/core/lib/esnext/components/forms/inputGroup';
import { FocusStyleManager } from '@blueprintjs/core/lib/esnext/accessibility/focusStyleManager';
import { Icon } from '@blueprintjs/core/lib/esnext/components/icon/icon';
import { Menu } from '@blueprintjs/core/lib/esnext/components/menu/menu';
import { MenuItem } from '@blueprintjs/core/lib/esnext/components/menu/menuItem';
import { Position } from '@blueprintjs/core/lib/esnext/common/position';
import { Toaster } from '@blueprintjs/core/lib/esnext/components/toast/toaster';
import {
  NonIdealState,
  NonIdealStateIconSize,
} from '@blueprintjs/core/lib/esnext/components/non-ideal-state/nonIdealState';

import { 
  useColorScheme,
  useKeyPress,
} from '../common/hooks';
import { mapConfigStateToGroups } from './util';
import { 
  AWSConfigItem,
  AWSConfigItemState,
} from '../types';
import { useConfig } from './hooks/useConfig';
import { createTab } from '../common/browser';
import { openOptions } from '../common/browser';
import { AWSIcon } from '../common/components';
import { sendToCurrentTab } from '../common/browser';

FocusStyleManager.onlyShowFocusOnTabs();

const executeSwitch = async (configItem: AWSConfigItem) => {
  try {
    await sendToCurrentTab(configItem, window.close);
  } catch (_) {
    Notification.show({ 
      message: 'Active tab is not an AWS console', 
      intent: 'danger', 
      timeout: 2000,
      icon: 'warning-sign',
    });
  }
};

const Notification = Toaster.create({
  position: Position.BOTTOM,
  maxToasts: 1,
});

const MenuSection: FC<{ title: string }> = ({ title }) => {
  return <div className="menu-divider">{title}</div>;
};

const RoleItem: FC<AWSConfigItemState> = (configItemState) => {
  const { title, aws_account_id, color, selected = false } = configItemState;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected) {
      ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [selected]);

  return (
    <div ref={ref}>
      <MenuItem
        onClick={() => executeSwitch(configItemState)}
        selected={selected}
        icon={<Icon icon="full-circle" color={color} />} 
        text={title} 
        label={aws_account_id} />
    </div>
  );
};

const App = () => {
  const theme = useColorScheme();
  const [ roles, filter, setFilter, selectIdx ] = useConfig();
  const enter = useKeyPress('Enter');

  useEffect(() => {
    if (selectIdx && roles[selectIdx]) {
      executeSwitch(roles[selectIdx]);
    }
  }, [enter]);

  return (
    <div id="popup" className={`wrapper bp4-${theme}`}>
      <ControlGroup className="header">
        <InputGroup 
          className="filter"
          value={filter}
          onChange={(evt) => setFilter(evt.target.value)}
          leftIcon="filter"
          placeholder="Filter...."
          autoFocus={true} />
        <div className="header-right">
          <Button 
            onClick={() => createTab('https://console.aws.amazon.com/console', true, window.close)} 
            icon={<AWSIcon theme={theme} />} 
            minimal={true} />
          <Button onClick={() => openOptions(window.close)} icon="wrench" minimal={true}></Button>
        </div>
      </ControlGroup>
      {
        roles.length <= 0 ? (
          <NonIdealState
            className="empty-state"
            icon={filter !== '' ? 'search' : undefined}
            iconSize={NonIdealStateIconSize.SMALL}
            description={filter !== '' ? 'No items found' : 'You did not specify any aws roles yet!'} 
            action={filter !== '' ? undefined : 
              <Button onClick={() => openOptions(window.close)} text="Open options page" icon="wrench" />}
          />        
        ) : (
          <Menu className="menu">
            {mapConfigStateToGroups(roles).map((group, gid) => (
              <div key={group.title+gid}>
                <MenuSection title={group.title} />
                {group.children.map((role, idx) => <RoleItem {...role} key={role.aws_account_id+idx} />)}
              </div>
            ))}
          </Menu>
        )
      }
    </div>
  );
};

render(<App />, document.getElementById('root'));
