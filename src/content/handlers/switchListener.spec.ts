/* @jest-environment jsdom */
import { sendMessage } from '../../common/browser/runtime';
import { getCsrfFromPage } from '../util/getCsrfFromPage';
import { createSigninForm } from '../util/createSigninForm';
import { mock } from '../../test/helper';
import { switchListener } from './switchListener';

jest.mock('../util/getCsrfFromPage');
jest.mock('../util/createSigninForm');
jest.mock('../../common/browser/runtime');
jest.spyOn(console, 'warn');
jest.spyOn(document.body, 'appendChild');

beforeEach(() => {
  mock(sendMessage).mockReset();
  mock(getCsrfFromPage).mockReset();
  mock(createSigninForm).mockReset();
  mock(console.warn).mockReset();
  mock(document.body.appendChild).mockReset();
});

it('should submit form when csrf set and form creation succeeded', () => {
  const submit = jest.fn();
  const form = document.createElement('form');
  form.submit = submit;
  
  mock(getCsrfFromPage).mockReturnValue('dummy');
  mock(createSigninForm).mockReturnValue(form);

  switchListener({ type: 'switch' } as Message);
  expect(document.body.appendChild).toHaveBeenCalled();
  expect(submit).toHaveBeenCalled();
});

it('should send message to background script if csrf fails', () => {
  const testError = new Error('test');
  mock(getCsrfFromPage).mockImplementation(() => {
    throw testError;
  });
  switchListener({ type: 'switch' } as Message);
  expect(sendMessage).toHaveBeenCalledWith({ type: 'redirect' });
  expect(console.warn).toHaveBeenCalledWith(testError);
});

it('should send message to background script if form creation fails', () => {
  const testError = new Error('test');
  mock(getCsrfFromPage).mockReturnValue('dummy');
  mock(createSigninForm).mockImplementation(() => {
    throw testError;
  });
  switchListener({ type: 'switch' } as Message);
  expect(sendMessage).toHaveBeenCalledWith({ type: 'redirect' });
  expect(console.warn).toHaveBeenCalledWith(testError);
});
