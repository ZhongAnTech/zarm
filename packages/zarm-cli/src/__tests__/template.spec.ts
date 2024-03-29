import { mocked } from 'ts-jest/utils';
import fs from 'fs';
import { sync } from 'mkdirp';
import signale from 'signale';
import chalk from 'chalk';
import createTemplate from '../template';

jest.mock('mkdirp');
jest.mock('chalk', () => {
  return { green: jest.fn() };
});

const syncMocked = mocked(sync);
const chalkGreenMocked = mocked(chalk.green);

describe('template', () => {
  afterAll(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('#createTemplate', () => {
    it('should create react component code snippet', () => {
      chalkGreenMocked.mockImplementation((str: any) => str);
      const openSyncMocked = jest.spyOn(fs, 'openSync').mockReturnValue(1);
      const writeSyncMocked = jest.spyOn(fs, 'writeSync').mockReturnValue(1);
      const infoStub = jest.spyOn(console, 'info').mockReturnValue();
      const signaleSuccessStub = jest.spyOn(signale, 'success').mockReturnValue(1);
      createTemplate({ compName: 'primary button' });

      expect(syncMocked).toBeCalledWith('src/primary-button');
      expect(syncMocked).toBeCalledWith('src/primary-button/style');
      expect(syncMocked).toBeCalledWith('src/primary-button/__tests__');
      expect(infoStub).toBeCalledWith(expect.stringMatching('create src/primary-button/index.ts'));
      expect(infoStub).toBeCalledWith(expect.stringMatching('create src/primary-button/demo.md'));
      expect(infoStub).toBeCalledWith(
        expect.stringMatching('create src/primary-button/interface.ts'),
      );
      expect(infoStub).toBeCalledWith(
        expect.stringMatching('create src/primary-button/primary button.tsx'),
      );
      expect(infoStub).toBeCalledWith(
        expect.stringMatching('create src/primary-button/style/index.ts'),
      );
      expect(infoStub).toBeCalledWith(
        expect.stringMatching('create src/primary-button/style/index.scss'),
      );
      expect(infoStub).toBeCalledWith(
        expect.stringMatching('create src/primary-button/__tests__/index.test.tsx'),
      );
      expect(infoStub).toBeCalledTimes(7);
      expect(openSyncMocked).toBeCalledTimes(7);
      expect(writeSyncMocked).toBeCalledTimes(7);
      expect(signaleSuccessStub).toBeCalledWith('create component templates successfully!!');
    });
  });
});
