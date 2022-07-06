import { keymap as codemirrorKeymap } from '@codemirror/view';

export type KeyMap = {
  key: string,
  fn: () => void
};

export default (keymap: KeyMap[]) => {
  return codemirrorKeymap.of(keymap.map(({ key, fn }) => {
    return {
      key,
      run() {
        fn();
        return true;
      },
    };
  }));
};
