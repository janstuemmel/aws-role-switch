import { useEffect, useRef, useState } from 'react';
import { getMappedConfig } from '../../common/config';
import { useKeydown } from '../../common/hooks';
import { AWSConfigItem, AWSConfigItemState } from '../../types';

type ConfigItem = AWSConfigItemState;

const filterConfigItem = (filter: string) => 
  (configItem: AWSConfigItem) => 
  configItem.title.toLowerCase().includes(filter.toLowerCase()) || 
  configItem.aws_account_id.toLowerCase().startsWith(filter.toLowerCase()) ||
  configItem.group?.toLowerCase().includes(filter.toLowerCase());
 
const useSelectIndex = (): [number | null, Function, Function] => {
  const [idx, setIdx] = useState<number | null>(null);
  const [len, setLen] = useState<number>(0);
  
  // use ref, u cannot use state in listeners
  // https://stackoverflow.com/a/55265764
  const lenRef = useRef(len)
  const setList = (list: any[]) => {
    lenRef.current = list.length;
    setLen(list.length)
    setIdx(null)
  }

  useKeydown((evt: KeyboardEvent) => {
    if (evt.key === 'ArrowDown') {
      evt.preventDefault();
      setIdx(idx => idx === null ? 0 : idx >= lenRef.current - 1 ? idx : idx + 1);
    }
    if (evt.key === 'ArrowUp') {
      evt.preventDefault();
      setIdx(idx => idx === null ? 0 : idx <= 0 ? idx : idx - 1);
    }
  })

  return [idx, setList, setIdx]
};

export const useConfig = (): [ConfigItem[], string, Function, number|null] => {
  const [ config, setConfig ] = useState<ConfigItem[]>([]);
  const [ filtered, setFiltered ] = useState<ConfigItem[]>([]);
  const [ filter, setFilter ] = useState<string>('');
  const [ selectIdx, setSelectList ] = useSelectIndex();

  useEffect(() => {
    getMappedConfig().then((c) => {
      setConfig(c);
      setFiltered(c);
      setSelectList(c);
    });
  }, []);
 
  useEffect(() => {
    setFiltered(filter === ''
      ? config
      : config.filter(filterConfigItem(filter))
    );
    
    // reset selected
    setSelectList(filtered)
  }, [filter]);

  useEffect(() => {
    // set item selected
    setFiltered(items => items.map((item, idx) => {
      return { ...item, selected: idx === selectIdx }
    }))
  }, [selectIdx])

  return [ filtered, filter, setFilter, selectIdx ];
};
