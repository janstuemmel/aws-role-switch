import {FocusStyleManager} from '@blueprintjs/core';
import type {GlobalProvider} from '@ladle/react';
import React from 'react';

FocusStyleManager.onlyShowFocusOnTabs();

export const Provider: GlobalProvider = ({children, globalState: {theme}}) => (
  <div className={`bp5-${theme}`}>{children}</div>
);
