import React, {useState,} from 'react';
import {
  Button,
  ControlGroup,
  InputGroup,
  NonIdealState,
  NonIdealStateIconSize,
} from '@blueprintjs/core';

import { groupBy } from '../util';
import SectionList from './SectionList';
import { RoleItem } from './RoleItem';

type PopupProps = {
  roles: AWSConfigItem[],
  executeSwitch?: (item: AWSConfigItem) => void
  headerRight?: JSX.Element | null
};

const filterConfigItem = (filter: string) => (configItem: AWSConfigItem) => 
  configItem.title.toLowerCase().includes(filter.toLowerCase()) || 
  configItem.aws_account_id.toLowerCase().startsWith(filter.toLowerCase()) ||
  configItem.group?.toLowerCase().includes(filter.toLowerCase());

const EmptyList = ({ emptyConfig }: { emptyConfig: boolean }) => <NonIdealState
  description={emptyConfig ? 'You did not specify any roles yet!' : 'No items found'}
  iconSize={NonIdealStateIconSize.SMALL}
  className="empty-state" 
  icon={emptyConfig ? undefined : 'search'}
  action={emptyConfig ? <Button onClick={() => {}} text="Open options page" icon="wrench" /> : undefined}
/>;

export const Popup = ({ 
  roles, 
  executeSwitch = () => {}, 
  headerRight = null 
}: PopupProps) => {
  const [filter, setFiler] = useState('');
  const items = filter ? roles.filter(filterConfigItem(filter)) : roles;
  const groups = groupBy(items, ['group']);
  const data = Object.keys(groups).map((gn) => ({
    title: gn,
    children: groups[gn],
  }));

  return (
    <div className="wrapper">
      <ControlGroup className="header">
        <InputGroup 
          className="filter"
          value={filter}
          onChange={({ target }) => setFiler(target.value)}
          leftIcon="filter"
          placeholder="Filter"
          autoFocus={true}
        />
        <div className="header-right">
          {headerRight}
        </div>
      </ControlGroup>
      {items.length > 0 ? 
        <SectionList 
          data={data}
          itemHeight={30}
          sectionHeight={25}
          onEnter={executeSwitch}
          renderItem={({ item, ...props }) => (
            <RoleItem {...props} {...item} onClick={() => executeSwitch(item)} />
          )}
          renderSection={({ title, ...props }) => <div className='menu-divider' {...props}>{title}</div>}
        /> : 
        <EmptyList emptyConfig={roles.length <= 0} />}
    </div>
  );
};
