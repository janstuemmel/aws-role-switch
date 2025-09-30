import {Menu} from '@blueprintjs/core';
import {defaultRangeExtractor, useVirtualizer} from '@tanstack/react-virtual';
import React, {type CSSProperties, useEffect, useRef} from 'react';

import {useKeyPress} from '../../common/hooks';
import {useUpDown} from '../hooks/useUpDown';

type ListItem<T> = {type: 'item'; item: T; idx: number};
type ListSection = {type: 'section'; title?: string};
type ListEntry<T> = ListItem<T> | ListSection;
type SectionListData<T> = {title?: string; children: T[]};
type ItemProps = {key: string | number; style: CSSProperties};

function mapToRows<T>(data: SectionListData<T>[]) {
  return data.reduce<ListEntry<T>[]>((prev, cur, i) => {
    const items: ListItem<T>[] = data[i].children.map((item, j) => ({
      item,
      type: 'item',
      idx: prev.length - i + j,
    }));
    return [...prev, {type: 'section', title: cur.title}, ...items];
  }, []);
}

export default <T,>({
  data,
  itemHeight,
  sectionHeight,
  renderSection,
  renderItem,
  onEnter = () => {},
}: {
  data: SectionListData<T>[];
  itemHeight: number;
  sectionHeight: number;
  renderItem: (props: {item: T; selected: boolean} & ItemProps) => JSX.Element;
  renderSection: (props: {title: string} & ItemProps) => JSX.Element;
  onEnter?: (item: T) => void;
}) => {
  const enter = useKeyPress('Enter');
  const ref = useRef(null);
  const rows = mapToRows<T>(data);
  const itemsLen = rows.filter((r) => r.type === 'item').length;
  const [idx, reset] = useUpDown(itemsLen);

  const activeStickyIndexRef = React.useRef<number | undefined>(0);
  const stickyIndexes = React.useMemo(
    () =>
      data.map((gn) =>
        rows.findIndex((n) => n.type === 'section' && n.title === gn.title),
      ),
    [data, rows],
  );
  const isSticky = (index: number) => stickyIndexes.includes(index);
  const isActiveSticky = (index: number) =>
    activeStickyIndexRef.current === index;

  const virtual = useVirtualizer({
    count: rows.length,
    overscan: 10,
    getScrollElement: () => ref.current,
    estimateSize: (i) =>
      rows[i].type === 'section' ? sectionHeight : itemHeight,
    rangeExtractor: React.useCallback(
      (range) => {
        activeStickyIndexRef.current = [...stickyIndexes]
          .reverse()
          .find((index) => range.startIndex >= index);
        const next = new Set([
          activeStickyIndexRef.current,
          ...defaultRangeExtractor(range),
        ]);
        return [...next] as number[];
      },
      [stickyIndexes, data],
    ),
  });

  useEffect(() => {
    reset(itemsLen);
    virtual.scrollToIndex(0, {behavior: 'auto'});
  }, [data]);

  useEffect(() => {
    const id = rows.findIndex((r) => r.type === 'item' && r.idx === idx);
    virtual.scrollToIndex(id || 0, {align: 'center', behavior: 'smooth'});
  }, [idx]);

  useEffect(() => {
    const item = rows.find((r) => r.type === 'item' && r.idx === idx);
    if (enter && item && item.type === 'item') {
      onEnter(item.item);
    }
  }, [enter]);

  // TODO: fix: sometimes there's an undefined virtual item
  const items = virtual.getVirtualItems().filter((i) => i);

  return (
    <div ref={ref} style={{flex: 1}} className="sectionList">
      <Menu
        className="menu"
        style={{height: virtual.getTotalSize(), position: 'relative'}}
      >
        {items.map(({size, start, index, key}) => {
          const item: ListEntry<T> = rows[index];
          const style: CSSProperties = {
            top: 0,
            left: 0,
            width: '100%',
            height: size,
            zIndex: isSticky(index) ? 10 : undefined,
            position: isActiveSticky(index) ? 'sticky' : 'absolute',
            transform: isActiveSticky(index)
              ? 'none'
              : `translateY(${start}px)`,
          };
          return item.type === 'section'
            ? renderSection({
                key,
                style,
                title: item.title ? item.title : 'Ungrouped',
              })
            : renderItem({
                key,
                style,
                selected: idx === item.idx,
                item: item.item,
              });
        })}
      </Menu>
    </div>
  );
};
