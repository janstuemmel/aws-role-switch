import React, {useState,} from 'react';
import {
  ControlGroup,
  InputGroup,
  NonIdealState,
  NonIdealStateIconSize,
} from '@blueprintjs/core';

import SectionList from './SectionList';
import { RoleItem } from './RoleItem';
import { mapConfigToGroups } from '../mappers/mapConfigToGroups';

type PopupProps = {
  roles: AWSConfigItem[],
  executeSwitch?: (item: AWSConfigItem) => void
  headerRight?: JSX.Element | null
};

const EmptyList = ({ emptyConfig }: { emptyConfig: boolean }) => <NonIdealState
  description={emptyConfig ? 'You did not specify any roles yet!' : 'No items found'}
  iconSize={NonIdealStateIconSize.SMALL}
  className="empty-state" 
  icon={emptyConfig ? 'wrench' : 'search'}
/>;

export const Popup = ({ 
  roles,
  executeSwitch = () => {}, 
  headerRight = null 
}: PopupProps) => {
  const [filter, setFiler] = useState('');
  const data = mapConfigToGroups(roles, filter);
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
      {data.length > 0 ? 
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
