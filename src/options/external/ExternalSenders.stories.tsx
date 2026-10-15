import * as React from 'react';

import ExternalSenders from './ExternalSenders';
import '../options.scss';

const CONFIGS: ExternalConfigs = {
  jpmkfafbacpgapdghgdpembnojdlgkdl: {
    active: true,
    config: '[role1]\naws_account_id = 1\n\n[role2]\naws_account_id = 2',
    updatedAt: Date.now(),
  },
  'sender@example.com': {
    active: false,
    config: '[role3]\naws_account_id = 3',
    updatedAt: Date.now() - 3600_000,
  },
};

export const WithSenders = () => (
  <div id="options-ui">
    <aside>
      <header>
        <ExternalSenders
          configs={CONFIGS}
          onToggle={() => {}}
          onRemove={() => {}}
        />
      </header>
    </aside>
  </div>
);
