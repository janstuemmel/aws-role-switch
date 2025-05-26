import {autocompletion} from '@codemirror/autocomplete';
import {copyLineDown, deleteLine} from '@codemirror/commands';
import {StreamLanguage} from '@codemirror/language';
import {toml} from '@codemirror/legacy-modes/mode/toml';
import {oneDark} from '@codemirror/theme-one-dark';
import {keymap} from '@codemirror/view';
import CodeMirror from '@uiw/react-codemirror';
import React from 'react';

import {
  completeKey,
  completeValue,
  showCompletionForCompletedKey,
} from './plugins/autocomplete';

type EditorProps = {
  theme?: 'light' | 'dark';
  height?: string;
  value?: string;
  onChange?: (val: string) => void;
  onSave?: () => boolean;
};

export default ({
  theme = 'light',
  height = '100vh',
  value = '',
  onChange = () => {},
  onSave = () => true,
}: EditorProps) => (
  <CodeMirror
    value={value}
    height={height}
    theme={theme === 'light' ? 'light' : oneDark}
    onChange={onChange}
    extensions={[
      StreamLanguage.define(toml),
      keymap.of([
        {key: 'Ctrl-s', run: onSave, preventDefault: true},
        {key: 'Ctrl-Shift-d', run: copyLineDown, preventDefault: true},
        {key: 'Ctrl-x', run: deleteLine, preventDefault: true},
      ]),
      autocompletion({
        override: [completeKey, completeValue],
      }),
      showCompletionForCompletedKey,
    ]}
  />
);
