/* @jest-environment jsdom */

import { mock } from "../../test/helper";
import { submitSigninForm } from "./submitSigninForm";

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

const FROM_EXT_KEY: keyof SwitchRoleFormFromExtension = '_fromAWSRoleSwitchExtension';

beforeEach(() => {
  document.body.style.display = 'test';
  // mockClear does not remove implementation
  mock(setTimeout).mockClear();
});

it('should submit form', () => {
  const form = { submit: jest.fn() } as unknown as HTMLFormElement;
  submitSigninForm(form, `http://dummy.tld?${FROM_EXT_KEY}=true`);
  
  jest.runAllTimers();
  expect(global.setTimeout).toHaveBeenCalled();
  expect(form.submit).toHaveBeenCalled();
  expect(document.body.style.display).toEqual('none');
});

it('should not submit form when not from extension', () => {
  const form = { submit: jest.fn() } as unknown as HTMLFormElement;
  submitSigninForm(form, 'http://dummy.tld');
  
  jest.runAllTimers();
  expect(global.setTimeout).not.toHaveBeenCalled();
  expect(form.submit).not.toHaveBeenCalled();
});

it('should not submit form when form not found', () => {
  const submit = jest.fn();
  const form = null as unknown as HTMLFormElement;
  submitSigninForm(form, `http://dummy.tld?${FROM_EXT_KEY}=true`);
  
  jest.runAllTimers();
  expect(global.setTimeout).not.toHaveBeenCalled();
  expect(submit).not.toHaveBeenCalled();
});
