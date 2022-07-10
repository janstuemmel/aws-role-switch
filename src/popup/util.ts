import groupBy from 'lodash/groupBy';
import keys from 'lodash/keys';

import { AWSConfigItemState } from "../types";

export const mapConfigStateToGroups = (config: AWSConfigItemState[]) => {
  const groups = groupBy(config, 'group');
  return keys(groups)
    .map((key: string) => ({

      // TODO: this looks wrong!
      title: key !== 'undefined' ? key : 'Ungrouped',
      children: groups[key]
    }));
};
