import path from 'path';
import fs from 'fs';
import { mock } from '../../test/helper';
import { onBuildEnd } from './mergeManifestsWithVersion';

jest.mock('fs', () => ({ promises: { writeFile: () => jest.fn(), readFile: () => jest.fn() } }));
jest.mock('path', () => ({ join: () => jest.fn(), basename: () => jest.fn() }));

jest.spyOn(fs.promises, 'writeFile');
jest.spyOn(fs.promises, 'readFile');
jest.spyOn(path, 'join');
jest.spyOn(path, 'basename');
jest.spyOn(process, 'cwd');

beforeEach(() => {
  mock(fs.promises.writeFile).mockReset();
  mock(fs.promises.readFile).mockReset();
  mock(path.join).mockReset();
  mock(path.basename).mockReset();
  mock(process.cwd).mockReset();
});

it('should assign jsons', async () => {
  mock(fs.promises.readFile)
    .mockResolvedValueOnce(JSON.stringify({ foo: 'bar' }))
    .mockResolvedValueOnce(JSON.stringify({ foo: 'baz' }));
  mock(path.join).mockReturnValue('home/foo.json');

  await onBuildEnd('vDummy', ['foo', 'bar'], 'out')();

  expect(fs.promises.readFile).toHaveBeenCalledWith('home/foo.json', 'utf8');
  expect(fs.promises.writeFile).toHaveBeenCalledWith('home/foo.json', expect.stringMatching(/baz/));
});

it('should not error if second json does not exist', async () => {
  mock(fs.promises.readFile)
    .mockResolvedValueOnce(JSON.stringify({ foo: 'bar' }))
    .mockRejectedValue(new Error('foo'));
  mock(path.join).mockReturnValue('home/foo.json');

  await onBuildEnd('vDummy', ['foo', 'bar'], 'out')();

  expect(fs.promises.readFile).toHaveBeenCalledWith('home/foo.json', 'utf8');
  expect(fs.promises.writeFile).toHaveBeenCalledWith('home/foo.json', expect.stringMatching(/bar/));
});

it('should not error if no json exists', async () => {
  mock(fs.promises.readFile)
    .mockRejectedValue(new Error('foo'))
    .mockRejectedValue(new Error('foo'));
  mock(path.join).mockReturnValue('home/foo.json');

  await onBuildEnd('vDummy', ['foo', 'bar'], 'out')();

  expect(fs.promises.readFile).toHaveBeenCalledWith('home/foo.json', 'utf8');
  expect(fs.promises.writeFile).toHaveBeenCalledWith('home/foo.json', '{}');
});
