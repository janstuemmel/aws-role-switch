import { groupBy, keys, sortBy } from "lodash"
import { AWSConfigItemState } from "../types"

export const mapConfigStateToGroups = (config: AWSConfigItemState[]) => {
  const groups = groupBy(config, 'group');
  return keys(groups)
    .map((key: string) => ({
      title: key,
      children: groups[key]
    }))
    // TODO: enable sorting again, does not work correctly with selecting
    // also: ungrouped elements should always be on top (they have no header)
    // .sort((a, b) => a.title < b.title ? -1 : 1)
}