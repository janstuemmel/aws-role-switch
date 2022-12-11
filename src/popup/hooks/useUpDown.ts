import {
  useEffect,
  useState,
} from 'react';

import { useKeyPress } from '../../common/hooks';

export const useUpDown = (length: number): [
  number | null, 
  (l: number) => void,
] => {
  const [idx, setIdx] = useState<number | null>(null);
  const [len, setLen] = useState<number>(length);
  const up = useKeyPress('ArrowUp');
  const down = useKeyPress('ArrowDown');
  useEffect(() => {
    if (up) {
      setIdx(idx === null ? 0 : idx <= 0 ? idx : idx - 1);
    } else if (down) {
      setIdx(idx === null ? 0 : idx >= len - 1 ? idx : idx + 1);
    }
  }, [up, down]);
  return [idx, (l: number) => {
    setIdx(null);
    setLen(l);
  }];
};
