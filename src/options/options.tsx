import React from 'react'
import { render } from 'react-dom'
import CodeMirror from '@uiw/react-codemirror'
import { StreamLanguage } from '@codemirror/language'
import { toml } from '@codemirror/legacy-modes/mode/toml'

import { setConfig } from '../common/config'
import keymap from './keymap'
import { 
  useColorScheme,
  useConfigFile,
  useDocs 
} from './hooks'
import { Alignment, Button, Navbar } from '@blueprintjs/core'
import { createTab } from '../common/browser'

const App = () => {
  const [configFile, setConfigFile] = useConfigFile()
  const docs = useDocs();
  const theme = useColorScheme()

  const link = (url: string) => () => createTab(url)
  const onSave = () => setConfig(configFile || '')
  const editorKeymap = keymap([{ key: 'Ctrl-s', fn: onSave }])

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
      <div className="divider"></div>
      <aside>
        <header>
          <Navbar>
            <Navbar.Group align={Alignment.LEFT}>
              <Navbar.Heading>AWS role switcher</Navbar.Heading>
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
              <Button onClick={link('https://github.com/janstuemmel/aws-role-switch/issues')} minimal={true}>
                Issues
              </Button>
              <Button onClick={link('https://github.com/janstuemmel/aws-role-switch')} minimal={true}>
                Github
              </Button>
              <Button onClick={link('https://github.com/janstuemmel/aws-role-switch')} minimal={true}>
                Homepage
              </Button>
            </Navbar.Group>
          </Navbar>
          <Button onClick={onSave} icon="floppy-disk" fill={true} large={true} style={{ marginTop: 10 }}>
            Save config (Ctrl-s)
          </Button>
        </header>
        <main>
          <p dangerouslySetInnerHTML={{ __html: docs }} />
        </main>
      </aside>
    </div>
  )
}

render(<App />, document.getElementById('root'))
