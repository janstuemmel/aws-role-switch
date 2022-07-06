import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import CodeMirror from '@uiw/react-codemirror'
import { StreamLanguage } from '@codemirror/language'
import { toml } from '@codemirror/legacy-modes/mode/toml'

import { getConfig, setConfig } from '../common/config'
import keymap from './keymap'

const App = () => {
  const [configFile, setConfigFile] = useState<string | undefined>(undefined)
  const onSave = () => setConfig(configFile || '')
  const editorKeymap = keymap([{ key: 'Ctrl-s', fn: onSave }])

  useEffect(() => {
    getConfig().then(setConfigFile)
  }, [])

  return (
    <div>
      <div className="header">
        <div>Config</div>
        <div>
          <button onClick={onSave}>Save</button>
        </div>
      </div>
      <CodeMirror
        minHeight="300px"
        theme="dark"
        onChange={(val) => setConfigFile(val)}
        value={configFile ? configFile : ''}
        extensions={[StreamLanguage.define(toml), editorKeymap]} />
    </div>
  )
}

render(<App />, document.getElementById('root'))
