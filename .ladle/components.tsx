import React from 'react';
import { GlobalProvider } from '@ladle/react';
import { FocusStyleManager } from '@blueprintjs/core';

FocusStyleManager.onlyShowFocusOnTabs();

export const Provider: GlobalProvider = ({ children, globalState: { theme } }) => (
  <div className={`bp4-${theme}`}>
    {children}
  </div>
);
