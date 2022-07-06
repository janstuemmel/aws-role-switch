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

const App = () => {
  const [configFile, setConfigFile] = useConfigFile()
  const docs = useDocs();
  const theme = useColorScheme()

  const onSave = () => setConfig(configFile || '')
  const editorKeymap = keymap([{ key: 'Ctrl-s', fn: onSave }])

  return (
    <div id="options-ui" className="wrapper" data-color-mode="dark">
      <div className="editor">
        <CodeMirror
          height="100vh"
          theme={theme}
          onChange={(val) => setConfigFile(val)}
          value={configFile ? configFile : ''}
          extensions={[StreamLanguage.define(toml), editorKeymap]} 
        />
      </div>
      <aside className="">
        <div className="terminal-nav">
          <div className="terminal-logo">
            <div className="logo">
              <a href="#" className="no-style">AWS_Config</a>
            </div>
          </div>
          <nav className="terminal-menu">
            <ul>
              <li><a className="menu-item" href="#">Issues</a></li>
              <li><a className="menu-item" href="#">Github</a></li>
              <li><a className="menu-item" href="#">Homepage</a></li>
            </ul>
          </nav>
        </div>
        <button className="btn btn-block">
          Save config (Ctrl-s)
        </button>
        <hr />
        <p dangerouslySetInnerHTML={{ __html: docs }} />
      </aside>
    </div>
  )
}

render(<App />, document.getElementById('root'))
