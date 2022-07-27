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
