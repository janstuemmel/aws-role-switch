import React from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { render } from 'react-dom'
import { StreamLanguage } from '@codemirror/language'
import { toml } from '@codemirror/legacy-modes/mode/toml'

const App = () => {
  return (
    <div>
      <div className="header">
        <div>Config</div>
        <div><button>Save</button></div>
      </div>
      <CodeMirror
        minHeight="300px"
        theme="dark"
        extensions={[StreamLanguage.define(toml)]} />
    </div>
  )
}

render(<App />, document.getElementById('root'))