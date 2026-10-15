import {saveExternalConfig} from '../../common/config/external';

const failure = (message: string): ExternalUpdateConfigResponse => ({
  result: 'failure',
  error: {message},
});

export const updateConfigFromExternal = async (
  msg: unknown,
  senderId: string | undefined,
): Promise<ExternalUpdateConfigResponse> => {
  const {action, dataType, data} = (msg ??
    {}) as Partial<ExternalUpdateConfigMessage>;

  if (action !== 'updateConfig') return failure('Invalid action');
  if (dataType !== 'ini') return failure('Invalid dataType');
  if (typeof data !== 'string') return failure('Invalid data');
  if (!senderId) return failure('Invalid sender');

  try {
    const {active} = await saveExternalConfig(senderId, data);
    return active
      ? {result: 'success'}
      : failure(
          `Config stored, approve sender ${senderId} in the aws-role-switch options`,
        );
  } catch (err) {
    return failure((err as Error).message);
  }
};
