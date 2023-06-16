import React, {
  useEffect,
  useState,
} from 'react';
import { render } from 'react-dom';
import {
  Button,
  FocusStyleManager,
  Position,
  Toaster,
} from '@blueprintjs/core';

import { Popup } from './components/Popup';
import { useColorScheme } from '../common/hooks';
import {
  openOptions,
  sendMessage,
} from '../common/browser/runtime';
import {
  createTab,
  getCurrentTab,
  sendToCurrentAwsConsoleTab,
} from '../common/browser';
import { AWSIcon } from '../common/components';

FocusStyleManager.onlyShowFocusOnTabs();

const executeSwitch = async (configItem: AWSConfigItem) => {
  return sendToCurrentAwsConsoleTab({ ...configItem, type: 'switch' })
    .then(window.close)
    .catch(() => {
      Notification.show({ 
        message: 'Active tab is not an AWS console', 
        intent: 'danger', 
        timeout: 2000,
        icon: 'warning-sign',
      });
    }); 
};

const Notification = Toaster.create({
  position: Position.BOTTOM,
  maxToasts: 1,
});

const App = () => {
  const [roles, setRoles] = useState<AWSConfig>([]);
  const [accountAlias, setAccountAlias] = useState<string | undefined>();
  const theme = useColorScheme();

  useEffect(() => {
    sendMessage<AWSConfig>({ type: 'getConfig' }).then(setRoles);
    
    getCurrentTab().then(tab => {
      sendMessage<string>({type: 'getAccountAlias', url: tab.url ?? ''}).then((alias) => {
        setAccountAlias(alias);
      });
    });
  }, []);

  return (
    <div className={`bp4-${theme}`}>
      <Popup 
        executeSwitch={executeSwitch} 
        roles={roles}
        accountAlias={accountAlias}
        headerRight={
          <>
            <Button 
              icon={<AWSIcon />} 
              minimal={true} 
              onClick={() => createTab('https://console.aws.amazon.com/console', true, window.close)}
              />
            <Button icon="wrench" minimal={true} onClick={() => openOptions(window.close)} />
          </>
        }
      />
    </div>
  );
};

render(<App />, document.getElementById('root') as HTMLDivElement);
