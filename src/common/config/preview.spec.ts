import {stringifyConfigSources} from './preview';

it('lists the sections of each source under its origin', () => {
  expect(
    stringifyConfigSources([
      {config: {local: {aws_account_id: '1', role_name: 'r'}}},
      {senderId: 'sender1', config: {ext: {aws_account_id: '2'}}},
    ]),
  ).toBe(
    '# editor\n[local]\naws_account_id = 1\nrole_name = r\n\n# sender sender1\n[ext]\naws_account_id = 2',
  );
});

it('leaves out sections shadowed by an earlier source', () => {
  expect(
    stringifyConfigSources([
      {config: {local: {role_name: 'kept'}}},
      {senderId: 'sender1', config: {local: {role_name: 'shadowed'}}},
    ]),
  ).toBe('# editor\n[local]\nrole_name = kept');
});
