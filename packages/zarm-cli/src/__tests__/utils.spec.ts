import fs from 'fs';
import path from 'path';
import { mocked } from 'ts-jest/utils';
import { fileTree, FileInfo, getCustomConfig } from '../utils';

jest.mock('fs');

const readdirSyncMocked = mocked(fs.readdirSync);
const statSyncMocked = mocked(fs.statSync);
const existsSyncMocked = mocked(fs.existsSync);

describe('utils', () => {
  let testDirPath: string;
  beforeAll(() => {
    testDirPath = '/virtual';
  });
  afterAll(() => {
    jest.resetAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('#fileTree', () => {
    it('should get file path tree', () => {
      readdirSyncMocked.mockReturnValueOnce((['/a.ts', '/b.ts'] as unknown) as fs.Dirent[]);
      const stats = ({ isDirectory: jest.fn().mockReturnValue(false) } as unknown) as fs.Stats;
      statSyncMocked.mockReturnValue(stats);
      const list: FileInfo[] = [];
      fileTree(list, testDirPath);
      expect(list).toEqual([
        { filePath: path.join(testDirPath, '/a.ts'), type: 'ts' },
        { filePath: path.join(testDirPath, '/b.ts'), type: 'ts' },
      ]);
      expect(readdirSyncMocked).toBeCalledWith(testDirPath);
      expect(readdirSyncMocked).toBeCalledTimes(1);
      expect(statSyncMocked).toBeCalledTimes(2);
      expect(stats.isDirectory).toBeCalledTimes(2);
    });

    it('should get file path recursively ', () => {
      readdirSyncMocked.mockImplementation((dirPath: string): any => {
        if (dirPath === path.join(testDirPath, '/a')) {
          return ['/x.ts', '/y.ts'];
        }
        return ['/a', '/b.ts'];
      });
      const statsA = ({ isDirectory: jest.fn().mockReturnValue(true) } as unknown) as fs.Stats;
      const statsB = ({ isDirectory: jest.fn().mockReturnValue(false) } as unknown) as fs.Stats;
      statSyncMocked.mockImplementation((filePath: string) => {
        switch (filePath) {
          case path.join(testDirPath, '/a'):
            return statsA;
          default:
            return statsB;
        }
      });
      const list: FileInfo[] = [];
      fileTree(list, testDirPath);
      expect(readdirSyncMocked).toBeCalledWith(testDirPath);
      expect(readdirSyncMocked).toBeCalledWith(path.join(testDirPath, '/a'));
      expect(readdirSyncMocked).toBeCalledTimes(2);
      expect(statSyncMocked).toBeCalledTimes(4);
      expect(statsA.isDirectory).toBeCalledTimes(1);
      expect(statsB.isDirectory).toBeCalledTimes(3);
      expect(list).toEqual([
        { filePath: path.join(testDirPath, '/a', '/x.ts'), type: 'ts' },
        { filePath: path.join(testDirPath, '/a', '/y.ts'), type: 'ts' },
        { filePath: path.join(testDirPath, '/b.ts'), type: 'ts' },
      ]);
    });
  });
  describe('#getCustomConfig', () => {
    it('should get default zarm config file', () => {
      const cwdSpy = jest.spyOn(process, 'cwd').mockReturnValueOnce(testDirPath);
      existsSyncMocked.mockReturnValueOnce(true);
      const configPath = path.join(testDirPath, 'zarm.config.js');
      jest.doMock(
        configPath,
        () => {
          return { banner: 'zarm' };
        },
        { virtual: true },
      );
      const actual = getCustomConfig();
      expect(actual).toEqual({ banner: 'zarm' });
      expect(cwdSpy).toBeCalledTimes(1);
      expect(existsSyncMocked).toBeCalledWith(path.join(testDirPath, 'zarm.config.js'));
    });
    it('should return empty object if config file does not exist', () => {
      const cwdSpy = jest.spyOn(process, 'cwd').mockReturnValueOnce(testDirPath);
      existsSyncMocked.mockReturnValueOnce(false);
      const actual = getCustomConfig('non-exists.config.js');
      expect(actual).toEqual({});
      expect(cwdSpy).toBeCalledTimes(1);
      expect(existsSyncMocked).toBeCalledWith(path.join(testDirPath, 'non-exists.config.js'));
    });
  });
});
