import React, { useEffect, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { render } from 'react-dom'
import { StreamLanguage } from '@codemirror/language'
import { toml } from '@codemirror/legacy-modes/mode/toml'
import { getConfig, setConfig } from '../common/storage'
import { keymap } from '@codemirror/view'

const App = () => {
  const [configFile, setConfigFile] = useState<string | undefined>(undefined)

  useEffect(() => {
    getConfig()
      .then(({ configFile }) => setConfigFile(configFile))
  }, [])

  const onSave = () => {
    setConfig(configFile || '', [])
  }

  const onChange = (val: string) => {
    setConfigFile(val)
  }

  const editorKeymap = () => {
    return keymap.of([{
      key: 'Ctrl-s',
      run() {
        onSave()
        return true
      }
    }])
  }

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
        onChange={onChange}
        value={configFile ? configFile : ''}
        extensions={[StreamLanguage.define(toml), editorKeymap()]} />
    </div>
  )
}

render(<App />, document.getElementById('root'))
