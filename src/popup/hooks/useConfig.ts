import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { getMappedConfig } from '../../common/config';
import { useKeyPress } from '../../common/hooks';
import { accountAndRoleNameFromConfigItem } from '../../common/mappers/switchForm';

type ConfigItem = AWSConfigItemState;

const mapSelected = (idx: number | null) => (item: ConfigItem, i: number): ConfigItem => ({
  ...item,
  selected: idx == i
});

const filterConfigItem = (filter: string) => 
  (configItem: AWSConfigItemState) => {
    const { account } = accountAndRoleNameFromConfigItem(configItem);

  return configItem.title.toLowerCase().includes(filter.toLowerCase()) || 
  account.toLowerCase().startsWith(filter.toLowerCase()) ||
  configItem.group?.toLowerCase().includes(filter.toLowerCase());
};

const mapItemsToState = (config: AWSConfigItem[]): AWSConfigItemState[] => 
  config.map((c: AWSConfigItem) => ({ ...c, selected: false }));

const useSelectIndex = (): [number | null, (len: number) => void, Dispatch<SetStateAction<number|null>>] => {
  const [idx, setIdx] = useState<number | null>(null);
  const [len, setLen] = useState<number>(0);
  const up = useKeyPress('ArrowUp');
  const down = useKeyPress('ArrowDown');
  
  useEffect(() => {
    if (up) {
      setIdx(idx === null ? 0 : idx <= 0 ? idx : idx - 1);
    } else if (down) {
      setIdx(idx === null ? 0 : idx >= len - 1 ? idx : idx + 1);
    }
  }, [up, down]);

  return [idx, setLen, setIdx];
};

export const useConfig = (): [ConfigItem[], string, (f: string) => void, number|null] => {
  const [ config, setConfig ] = useState<ConfigItem[]>([]);
  const [ filtered, setFiltered ] = useState<ConfigItem[]>([]);
  const [ filter, setFilter ] = useState<string>('');
  const [ selectIdx, setSelectLen, setSelectIdx ] = useSelectIndex();

  useEffect(() => {
    getMappedConfig().then(mapItemsToState).then((c) => {
      setConfig(c);
      setFiltered(c);
      setSelectLen(c.length);
    });
  }, []);
 
  useEffect(() => {
    const filteredItems = filter === '' 
      ? config 
      : config
        .filter(filterConfigItem(filter))
        .map(mapSelected(0));
    setFiltered(filteredItems);
    setSelectLen(filteredItems.length);
    setSelectIdx(filter === '' ? null : 0);
  }, [filter]);

  useEffect(() => {
    setFiltered(filtered.map(mapSelected(selectIdx)));
  }, [selectIdx]);

  return [ filtered, filter, setFilter, selectIdx ];
};
