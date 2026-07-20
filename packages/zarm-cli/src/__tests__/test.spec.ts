import execa from 'execa';
import testExecutor from '../test';

jest.mock('execa');
const execaSyncMocked = jest.mocked(execa.sync);

describe('test', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  it('should execute jest command for web module', () => {
    testExecutor({});
    expect(execaSyncMocked).toBeCalledWith(
      'node',
      expect.arrayContaining([
        expect.stringContaining('jest'),
        expect.stringContaining('--config='),
        expect.stringContaining('--setupFilesAfterEnv='),
      ]),
      { stdio: 'inherit' },
    );
  });
  // TODO: Not sure jest command can be used with --coverage and -u options together
  it('should execute jest command with --coverage and -u options', () => {
    testExecutor({ coverage: true, updateSnapshot: true });
    expect(execaSyncMocked).toBeCalledWith(
      'node',
      expect.arrayContaining([
        expect.stringContaining('jest'),
        expect.stringContaining('--config='),
        expect.stringContaining('--setupFilesAfterEnv='),
        expect.stringContaining('-u'),
        expect.stringContaining('--coverage'),
      ]),
      { stdio: 'inherit' },
    );
  });
});
