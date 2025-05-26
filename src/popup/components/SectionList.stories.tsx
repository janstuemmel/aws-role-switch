import React from 'react';

import {RoleItem} from './RoleItem';
import SectionList from './SectionList';

import '../popup.scss';

export const SectionListWithGroups = () => {
  const data = [
    {
      title: undefined,
      children: [
        {title: 'awesome-aws-project', color: 'green'},
        {title: 'awesome-aws-project', color: 'yellow'},
        {title: 'awesome-aws-project', color: 'darkred'},
        {title: 'awesome-aws-project'},
      ],
    },
    {
      title: 'Section 1',
      children: [
        {title: 'awesome-aws-project', color: 'green'},
        {title: 'awesome-aws-project', color: 'yellow'},
        {title: 'awesome-aws-project', color: 'darkred'},
        {title: 'awesome-aws-project'},
      ],
    },
    {
      title: 'Section 2',
      children: [
        {title: 'awesome-aws-project'},
        {title: 'awesome-aws-project'},
        {title: 'awesome-aws-project'},
        {title: 'awesome-aws-project'},
        {title: 'awesome-aws-project'},
        {title: 'awesome-aws-project'},
        {title: 'awesome-aws-project'},
        {title: 'awesome-aws-project'},
        {title: 'awesome-aws-project'},
        {title: 'awesome-aws-project'},
        {title: 'awesome-aws-project'},
        {title: 'awesome-aws-project'},
      ],
    },
    {
      title: 'Section 3',
      children: [
        {title: 'awesome-aws-project'},
        {title: 'awesome-aws-project'},
        {title: 'awesome-aws-project'},
      ],
    },
    {
      title: 'Section 4',
      children: [
        {title: 'awesome-aws-project'},
        {title: 'awesome-aws-project'},
        {title: 'awesome-aws-project'},
      ],
    },
    {
      title: 'Section 5',
      children: [
        {title: 'awesome-aws-project'},
        {title: 'awesome-aws-project'},
        {title: 'awesome-aws-project'},
      ],
    },
  ];

  return (
    <div style={{height: 400, display: 'flex'}}>
      <SectionList
        data={data}
        itemHeight={30}
        sectionHeight={25}
        renderItem={({item, ...props}) => (
          <RoleItem
            {...props}
            aws_account_id="12132321"
            role_name="asdas"
            title={item.title}
            color={item.color}
          />
        )}
        renderSection={({title, ...props}) => (
          <div className="menu-divider" {...props}>
            {title}
          </div>
        )}
      />
    </div>
  );
};
