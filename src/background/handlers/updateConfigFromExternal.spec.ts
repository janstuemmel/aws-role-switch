jest.mock('../../common/config/external');

import {saveExternalConfig} from '../../common/config/external';
import {mock} from '../../test/helper';
import {updateConfigFromExternal} from './updateConfigFromExternal';

const saveExternalConfigMock = mock(saveExternalConfig);

const message = {action: 'updateConfig', dataType: 'ini', data: '[role]'};

beforeEach(() => {
  saveExternalConfigMock.mockReset();
});

it.each([
  [{...message, action: 'deleteConfig'}, 'Invalid action'],
  [{...message, dataType: 'json'}, 'Invalid dataType'],
  [{...message, data: 42}, 'Invalid data'],
  [undefined, 'Invalid action'],
])('rejects message %p', async (msg, error) => {
  expect(await updateConfigFromExternal(msg, 'sender1')).toEqual({
    result: 'failure',
    error: {message: error},
  });
  expect(saveExternalConfigMock).not.toHaveBeenCalled();
});

it('rejects a message without sender id', async () => {
  expect(await updateConfigFromExternal(message, undefined)).toEqual({
    result: 'failure',
    error: {message: 'Invalid sender'},
  });
});

it('accepts the config of an approved sender', async () => {
  saveExternalConfigMock.mockResolvedValue({
    active: true,
    config: '[role]',
    updatedAt: 0,
  });
  expect(await updateConfigFromExternal(message, 'sender1')).toEqual({
    result: 'success',
  });
  expect(saveExternalConfigMock).toHaveBeenCalledWith('sender1', '[role]');
});

it('stores the config of an unapproved sender and asks for approval', async () => {
  saveExternalConfigMock.mockResolvedValue({
    active: false,
    config: '[role]',
    updatedAt: 0,
  });
  expect(await updateConfigFromExternal(message, 'sender1')).toEqual({
    result: 'failure',
    error: {
      message:
        'Config stored, approve sender sender1 in the aws-role-switch options',
    },
  });
});

it('reports storage errors', async () => {
  saveExternalConfigMock.mockRejectedValue(new Error('QUOTA_BYTES exceeded'));
  expect(await updateConfigFromExternal(message, 'sender1')).toEqual({
    result: 'failure',
    error: {message: 'QUOTA_BYTES exceeded'},
  });
});
