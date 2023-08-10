import * as React from "react";
import { useLadleContext } from '@ladle/react';

import Editor from "./Editor";
import '../options.scss';

const TEST_VALUE = `[test]
aws_account_id = 11234
color = 
region = `;

export const EditorWithText = () => {
  const { globalState } = useLadleContext();
  return (
    <Editor 
      height="400px"
      value={TEST_VALUE} 
      theme={globalState.theme == 'dark' ? 'dark' : 'light'} 
    />
  );
};

export const Scrollbar = () => 
  <div style={{ overflow: 'auto', height: 300 }}>
    <div style={{ height: 999, background: 'gray' }}></div>
  </div>;
