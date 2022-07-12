import { Runtime } from 'webextension-polyfill';

import { updateTabUrl } from '../../common/browser/tabs';
import { mapToSwitchForm } from '../../common/mappers';
import { mock } from '../../test/helper';
import {
  Message,
  SwitchRoleForm,
} from '../../types';
import { redirectListener } from './redirectListener';

jest.mock('../../common/mappers');
jest.mock('../../common/browser/tabs');

beforeEach(() => {
  mock(mapToSwitchForm).mockReset();
  mock(updateTabUrl).mockReset();
});

it('should call updateUrl with params', () => {
  mock(mapToSwitchForm).mockReturnValue({ foo: 'bar' } as unknown as SwitchRoleForm);
  redirectListener(
    { type: 'redirect' } as Message, 
    { tab: { id: 1337 } } as Runtime.MessageSender,
  );
  expect(updateTabUrl).toHaveBeenCalledWith(
    1337,
    'https://signin.aws.amazon.com/switchrole?foo=bar'
  );
});
