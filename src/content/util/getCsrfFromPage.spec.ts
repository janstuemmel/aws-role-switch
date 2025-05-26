/* @jest-environment jsdom */

import {getCsrfFromPage} from './getCsrfFromPage';

beforeEach(() => {
  // clear dom
  document.body.innerHTML = '';
  window.wrappedJSObject = undefined;
});

it('should not find csrf and throw', () => {
  expect(getCsrfFromPage).toThrowErrorMatchingInlineSnapshot(
    `"csrf not found"`,
  );
});

it('should get csrf from input element', () => {
  document.body.innerHTML = '<input name="csrf" value="dummy" />';
  expect(getCsrfFromPage()).toEqual('dummy');
});

it('should get csrf from window as string', () => {
  window.wrappedJSObject = {
    AWSC: {
      Auth: {
        getMbtc: () => 1337,
      },
    },
  };
  expect(getCsrfFromPage()).toEqual('1337');
});

it('should get csrf from window', () => {
  window.wrappedJSObject = {};
  expect(getCsrfFromPage).toThrowErrorMatchingInlineSnapshot(
    `"csrf not found"`,
  );
});
