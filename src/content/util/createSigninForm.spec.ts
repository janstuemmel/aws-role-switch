/* @jest-environment jsdom */

import { createSigninForm } from "./createSigninForm";

it('should create form correctly', () => {
  const form = createSigninForm({
    aws_account_id: 'dummy-id',
    title: 'dummy-title',
    role_name: 'dummy-role',
  }, '1337');

  expect(form).toMatchInlineSnapshot(`
<form
  action="https://signin.aws.amazon.com/switchrole"
  method="POST"
  style="display: none;"
>
  <input
    name="account"
    value="dummy-id"
  />
  <input
    name="roleName"
    value="dummy-role"
  />
  <input
    name="displayName"
    value="dummy-title | dummy-id"
  />
  <input
    name="action"
    value="switchFromBasis"
  />
  <input
    name="mfaNeeded"
    value="0"
  />
  <input
    name="csrf"
    value="1337"
  />
  <input
    name="redirect_uri"
    value="http://localhost/"
  />
</form>
`);

  const data = Object.fromEntries(new FormData(form));
  expect(data).toMatchInlineSnapshot(`
Object {
  "account": "dummy-id",
  "action": "switchFromBasis",
  "csrf": "1337",
  "displayName": "dummy-title | dummy-id",
  "mfaNeeded": "0",
  "redirect_uri": "http://localhost/",
  "roleName": "dummy-role",
}
`);
});

it('should create form for an arn_role based entry', () => {
  const form = createSigninForm({
    title: 'arn_role-title',
    role_arn: 'arn:aws:iam::123456789012:role/MyRole'
  }, '42');

  expect(form).toMatchInlineSnapshot(`
<form
  action="https://signin.aws.amazon.com/switchrole"
  method="POST"
  style="display: none;"
>
  <input
    name="roleName"
    value="MyRole"
  />
  <input
    name="account"
    value="123456789012"
  />
  <input
    name="displayName"
    value="arn_role-title | 123456789012"
  />
  <input
    name="action"
    value="switchFromBasis"
  />
  <input
    name="mfaNeeded"
    value="0"
  />
  <input
    name="csrf"
    value="42"
  />
  <input
    name="redirect_uri"
    value="http://localhost/"
  />
</form>
`);

  const data = Object.fromEntries(new FormData(form));
  expect(data).toMatchInlineSnapshot(`
Object {
  "account": "123456789012",
  "action": "switchFromBasis",
  "csrf": "42",
  "displayName": "arn_role-title | 123456789012",
  "mfaNeeded": "0",
  "redirect_uri": "http://localhost/",
  "roleName": "MyRole",
}
`);
});

