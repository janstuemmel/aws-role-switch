import React, { FC, useEffect, useRef } from 'react';
import { render } from 'react-dom';
import {
  Button,
  ControlGroup,
  Icon,
  InputGroup,
  Menu,
  MenuItem,
  NonIdealState,
  NonIdealStateIconSize
} from '@blueprintjs/core';
import { tabs } from 'webextension-polyfill'; // TODO: remove

import { 
  useColorScheme,
  useKeydown,
} from '../common/hooks';
import { mapConfigStateToGroups } from './util';
import { 
  AWSConfigItem,
  AWSConfigItemState,
} from '../types';
import { useConfig } from './hooks/useConfig';
import {
  createTab,
  getCurrentTab,
} from '../common/browser';
import { openOptions } from '../common/browser';
import { AWSIcon } from '../common/components';

const executeSwitch = async (configItem: AWSConfigItem) => {
  const tab = await getCurrentTab();
  if (tab.id) {
    await tabs.sendMessage(tab.id, configItem);
    window.close();
  }
}

const MenuSection: FC<{ title: string }> = ({ title }) => {
  return <div className="menu-divider">{title}</div>
};

const RoleItem: FC<AWSConfigItemState> = (configItemState) => {
  const { title, aws_account_id, color, selected = false } = configItemState
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selected) {
      ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }, [selected])

  return (
    <div ref={ref}>
      <MenuItem
        onClick={() => executeSwitch(configItemState)}
        selected={selected}
        icon={<Icon icon="full-circle" color={color} />} 
        text={title} 
        label={aws_account_id} />
    </div>
  )
}

const App = () => {
  const theme = useColorScheme();
  const [ roles, filter, setFilter, selectIdx ] = useConfig();

  const selectIdxRef = useRef(selectIdx)
  const rolesRef = useRef(roles)

  // update refs to use them in document listeners
  useEffect(() => {
    selectIdxRef.current = selectIdx
    rolesRef.current = roles
  }, [selectIdx, roles]);

  useKeydown(async (evt: KeyboardEvent) => {
    if (selectIdxRef.current !== null && evt.key === 'Enter') {
      const configItem = rolesRef.current[selectIdxRef.current]
      if (configItem) {
        await executeSwitch(configItem);
      }
    }
  });

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
            description="You did not specify any aws roles yet!" 
            action={<Button onClick={() => openOptions(window.close)} text="Open options page" icon="wrench" />}
            iconSize={NonIdealStateIconSize.SMALL}
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
  )
}

render(<App />, document.getElementById('root'));
