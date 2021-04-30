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

      expect(syncMocked).toBeCalledWith('components/primary-button');
      expect(syncMocked).toBeCalledWith('components/primary-button/style');
      expect(syncMocked).toBeCalledWith('components/primary-button/__tests__');
      expect(infoStub).toBeCalledWith(
        expect.stringMatching('create components/primary-button/index.tsx'),
      );
      expect(infoStub).toBeCalledWith(
        expect.stringMatching('create components/primary-button/demo.md'),
      );
      expect(infoStub).toBeCalledWith(
        expect.stringMatching('create components/primary-button/primary button.tsx'),
      );
      expect(infoStub).toBeCalledWith(
        expect.stringMatching('create components/primary-button/style/index.tsx'),
      );
      expect(infoStub).toBeCalledWith(
        expect.stringMatching('create components/primary-button/style/index.scss'),
      );
      expect(infoStub).toBeCalledWith(
        expect.stringMatching('create components/primary-button/__tests__/index.test.jsx'),
      );
      expect(infoStub).toBeCalledTimes(6);
      expect(openSyncMocked).toBeCalledTimes(6);
      expect(writeSyncMocked).toBeCalledTimes(6);
      expect(signaleSuccessStub).toBeCalledWith('create component templates successfully!!');
    });
  });
});
