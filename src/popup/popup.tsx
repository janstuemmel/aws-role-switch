import {Button, FocusStyleManager, Position, Toaster} from '@blueprintjs/core';
import React, {useEffect, useState} from 'react';
import {render} from 'react-dom';

import {
  createTab,
  getCurrentTab,
  sendToCurrentAwsConsoleTab,
} from '../common/browser';
import {openOptions, sendMessage} from '../common/browser/runtime';
import {AWSIcon} from '../common/components';
import {useColorScheme} from '../common/hooks';
import {Popup} from './components/Popup';

FocusStyleManager.onlyShowFocusOnTabs();

const executeSwitch = async (configItem: AWSConfigItem) => {
  return sendToCurrentAwsConsoleTab({...configItem, type: 'switch'})
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
  const theme = useColorScheme();

  useEffect(() => {
    getCurrentTab().then((tab) => {
      sendMessage<AWSConfig>({type: 'getConfig', url: tab.url ?? ''}).then(
        setRoles,
      );
    });
  }, []);

  const handleCopyAccountId = (accountId: string) => {
    navigator.clipboard.writeText(accountId);
    Notification.show({
      message: `Copied ${accountId}`,
      intent: 'success',
      timeout: 2000,
      icon: 'tick',
    });
  };

  return (
    <div className={`bp5-${theme}`}>
      <Popup
        executeSwitch={executeSwitch}
        roles={roles}
        onCopyAccountId={handleCopyAccountId}
        headerRight={
          <>
            <Button
              icon={<AWSIcon />}
              variant="minimal"
              onClick={() =>
                createTab(
                  'https://console.aws.amazon.com/console',
                  true,
                  window.close,
                )
              }
            />
            <Button
              icon="wrench"
              variant="minimal"
              onClick={() => openOptions(window.close)}
            />
          </>
        }
      />
    </div>
  );
};

render(<App />, document.getElementById('root') as HTMLDivElement);
