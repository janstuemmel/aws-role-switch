import { mapToSwitchForm } from "./switchForm";

it('map region to redirect url', () => {
  const params = mapToSwitchForm({
    aws_account_id: 'dummy',
    role_name: 'DummyAdmin',
    title: 'dummy-account',
    region: 'eu-central-1',
  }, {
    redirect_uri: 'https://example.com?region=us-east-2'
  });

  expect(params).toMatchInlineSnapshot(`
Object {
  "account": "dummy",
  "action": "switchFromBasis",
  "color": undefined,
  "displayName": "dummy-account | dummy",
  "mfaNeeded": "0",
  "redirect_uri": "https://example.com/?region=eu-central-1",
  "roleName": "DummyAdmin",
}
`);
});

it('keep region in redirect url', () => {
  const params = mapToSwitchForm({
    aws_account_id: 'dummy',
    role_name: 'DummyAdmin',
    title: 'dummy-account',
  }, {
    redirect_uri: 'https://example.com?region=us-east-2'
  });

  expect(params).toMatchInlineSnapshot(`
Object {
  "account": "dummy",
  "action": "switchFromBasis",
  "color": undefined,
  "displayName": "dummy-account | dummy",
  "mfaNeeded": "0",
  "redirect_uri": "https://example.com/?region=us-east-2",
  "roleName": "DummyAdmin",
}
`);
});

it('take default (us-east-1) region in redirect url when not defined', () => {
  const params = mapToSwitchForm({
    aws_account_id: 'dummy',
    role_name: 'DummyAdmin',
    title: 'dummy-account',
  }, {
    redirect_uri: 'https://example.com'
  });

  expect(params).toMatchInlineSnapshot(`
Object {
  "account": "dummy",
  "action": "switchFromBasis",
  "color": undefined,
  "displayName": "dummy-account | dummy",
  "mfaNeeded": "0",
  "redirect_uri": "https://example.com/?region=us-east-1",
  "roleName": "DummyAdmin",
}
`);
});

it('keep invalid redirect url', () => {
  const params = mapToSwitchForm({
    aws_account_id: 'dummy',
    role_name: 'DummyAdmin',
    title: 'dummy-account',
  }, {
    redirect_uri: 'example.com?region=us-east-2'
  });

  expect(params).toMatchInlineSnapshot(`
Object {
  "account": "dummy",
  "action": "switchFromBasis",
  "color": undefined,
  "displayName": "dummy-account | dummy",
  "mfaNeeded": "0",
  "redirect_uri": "example.com?region=us-east-2",
  "roleName": "DummyAdmin",
}
`);
});
