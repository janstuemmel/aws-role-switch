import {
  Alignment,
  Button,
  Card,
  FocusStyleManager,
  Navbar,
  OverlayToaster,
  Position,
  ProgressBar,
} from '@blueprintjs/core';
import React, {useEffect, useState} from 'react';
import {render} from 'react-dom';

import {
  STORAGE_MAX_ITEM_SIZE,
  createTab,
  getStorageSize,
} from '../common/browser';
import {setConfig} from '../common/config';
import {useColorScheme} from '../common/hooks';
import Editor from './editor/Editor';
import {useConfigFile, useDocs} from './hooks';

FocusStyleManager.onlyShowFocusOnTabs();

const Notification = OverlayToaster.create({
  position: Position.TOP,
  maxToasts: 4,
});

const NavLink = ({url, title}: {url: string; title: string}) => (
  <Button onClick={() => createTab(url)} minimal={true}>
    {title}
  </Button>
);

const App = () => {
  const [configFile, setConfigFile] = useConfigFile();
  const [size, setSize] = useState(0);
  const docs = useDocs();
  const theme = useColorScheme();
  const getStorage = () => getStorageSize().then(setSize);

  useEffect(() => {
    getStorage();
  }, []);

  const onSave = () => {
    setConfig(configFile ?? '')
      .then(() =>
        Notification.show({
          icon: 'saved',
          message: 'Config saved',
          intent: 'success',
          timeout: 1000,
        }),
      )
      .catch(() =>
        Notification.show({
          message: 'Could not save config',
          intent: 'danger',
        }),
      )
      .finally(getStorage);
    return true;
  };

  const syncSize = (size + 200) / (STORAGE_MAX_ITEM_SIZE * 10);

  return (
    <div id="options-ui" className={`wrapper bp5-${theme}`}>
      <div className="editor">
        <Editor
          theme={theme}
          value={configFile ? configFile : ''}
          onChange={(val) => setConfigFile(val)}
          onSave={onSave}
        />
      </div>
      <div className="divider" />
      <aside>
        <header>
          <Navbar>
            <Navbar.Group align={Alignment.LEFT}>
              <Navbar.Heading>AWS role switcher</Navbar.Heading>
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
              <NavLink
                url="https://github.com/janstuemmel/aws-role-switch/issues"
                title="Issues"
              />
              <NavLink
                url="https://github.com/janstuemmel/aws-role-switch"
                title="Github"
              />
              <NavLink
                url="https://janstuemmel.de/aws-role-switch/"
                title="Homepage"
              />
            </Navbar.Group>
          </Navbar>
          <Card style={{marginTop: 10}}>
            <p>Storage left</p>
            <ProgressBar
              value={syncSize}
              animate={false}
              stripes={false}
              intent={
                syncSize > 0.8
                  ? 'danger'
                  : syncSize > 0.6
                    ? 'warning'
                    : 'success'
              }
            />
          </Card>
          <Button
            onClick={onSave}
            icon="floppy-disk"
            fill={true}
            large={true}
            style={{marginTop: 10}}
          >
            Save config (Ctrl-s)
          </Button>
        </header>
        <main>
          <p dangerouslySetInnerHTML={{__html: docs}} />
        </main>
      </aside>
    </div>
  );
};

render(<App />, document.getElementById('root'));
