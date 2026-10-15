import {Dialog, DialogBody} from '@blueprintjs/core';
import React from 'react';

import Editor from '../editor/Editor';

type Props = {
  // the dialog is open while a value is set
  value?: string;
  theme: 'light' | 'dark';
  onClose: () => void;
};

const MergedConfigDialog = ({value, theme, onClose}: Props) => (
  <Dialog
    isOpen={value !== undefined}
    onClose={onClose}
    title="Merged config"
    icon="eye-open"
    className={`bp5-${theme}`}
    style={{width: '80vw'}}
  >
    <DialogBody>
      <p className="bp5-text-muted">
        Saved editor config and enabled senders, as the popup reads them.
      </p>
      <Editor value={value} theme={theme} height="60vh" readOnly={true} />
    </DialogBody>
  </Dialog>
);

export default MergedConfigDialog;
