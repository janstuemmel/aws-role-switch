import React,
{
  useEffect,
  useState,
} from 'react';
import { render } from 'react-dom';
import CodeMirror from '@uiw/react-codemirror';
import { StreamLanguage } from '@codemirror/language';
import { toml } from '@codemirror/legacy-modes/mode/toml';
import {
  Alignment,
  Button,
  Card,
  FocusStyleManager,
  Navbar,
  Position,
  ProgressBar,
  Toaster,
} from '@blueprintjs/core';

import { setConfig } from '../common/config';
import keymap from './keymap';
import { 
  useConfigFile,
  useDocs 
} from './hooks';
import {
  createTab,
  getStorageSize,
  STORAGE_MAX_ITEM_SIZE,
} from '../common/browser';
import { useColorScheme } from '../common/hooks';

FocusStyleManager.onlyShowFocusOnTabs();

const Notification = Toaster.create({
  position: Position.TOP,
  maxToasts: 4,
});

const NavLink = ({ url, title }: { url: string, title: string }) => (
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

  const onSave = async () => {
    try {
      await setConfig(configFile || '');
      Notification.show({
        icon: 'saved',
        message: 'Config saved',
        intent: 'success',
        timeout: 1000,
      });
    } catch (_) {
      Notification.show({
        message: 'Could not save config',
        intent: 'danger',
      });
    }

    // update sync storage size bar
    getStorage();
  };
  const editorKeymap = keymap([{ key: 'Ctrl-s', fn: onSave }]);
  const syncSize = (size + 200) / STORAGE_MAX_ITEM_SIZE;

  return (
    <div id="options-ui" className={`wrapper bp4-${theme}`}>
      <div className="editor">
        <CodeMirror
          height="100vh"
          theme={theme}
          onChange={(val) => setConfigFile(val)}
          value={configFile ? configFile : ''}
          extensions={[StreamLanguage.define(toml), editorKeymap]} 
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
              <NavLink url="https://github.com/janstuemmel/aws-role-switch/issues" title="Issues" />
              <NavLink url="https://github.com/janstuemmel/aws-role-switch" title="Github" />
              <NavLink url="https://janstuemmel.de/aws-role-switch/" title="Homepage" />
            </Navbar.Group>
          </Navbar>
          <Card style={{ marginTop: 10 }}>
            <p>Storage left</p>
            <ProgressBar 
              value={syncSize} 
              animate={false} 
              stripes={false} 
              intent={syncSize > 0.8 ? 'danger' : syncSize > 0.6 ? 'warning' : 'success'} 
            />
          </Card>
          <Button onClick={onSave} icon="floppy-disk" fill={true} large={true} style={{ marginTop: 10 }}>
            Save config (Ctrl-s)
          </Button>
        </header>
        <main>
          <p dangerouslySetInnerHTML={{ __html: docs }} />
        </main>
      </aside>
    </div>
  );
};

render(<App />, document.getElementById('root'));
