import {Button, Card, Switch} from '@blueprintjs/core';
import React from 'react';

import {parseConfig} from '../../common/config';

type Props = {
  configs: ExternalConfigs;
  onToggle: (senderId: string, active: boolean) => void;
  onRemove: (senderId: string) => void;
};

const ExternalSenders = ({configs, onToggle, onRemove}: Props) => {
  const senders = Object.entries(configs);
  if (!senders.length) {
    return null;
  }

  return (
    <Card className="external-senders" style={{marginTop: 10}}>
      <p>Config senders (extensions)</p>
      {senders.map(([senderId, {active, config, updatedAt}]) => (
        <div key={senderId} className="external-sender">
          <Switch
            checked={active}
            label={senderId}
            onChange={(e) => onToggle(senderId, e.currentTarget.checked)}
          />
          <span className="bp5-text-muted">
            {Object.keys(parseConfig(config)).length} profiles,{' '}
            {new Date(updatedAt).toLocaleString()}
          </span>
          <Button
            icon="trash"
            minimal={true}
            small={true}
            title={`Remove ${senderId}`}
            aria-label={`Remove ${senderId}`}
            onClick={() => onRemove(senderId)}
          />
        </div>
      ))}
    </Card>
  );
};

export default ExternalSenders;
