import HtmlWebpackPlugin from 'html-webpack-plugin';
import { mocked } from "jest-mock";

import { getProjectConfig } from '../deploy';
import { getCustomConfig } from '../utils';

jest.mock('../utils');
jest.mock('html-webpack-plugin', () => jest.fn());

const HtmlWebpackPluginMocked = mocked(HtmlWebpackPlugin);
const getCustomConfigMocked = mocked(getCustomConfig);

describe('deploy', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('#getProjectConfig', () => {
    it('should merge custom webpack config and pre-defined webpack config', () => {
      getCustomConfigMocked.mockReturnValueOnce({ mode: 'development' });
      const actual = getProjectConfig({ name: 'test-only' });
      expect(actual).toEqual({ entry: {}, name: 'test-only', mode: 'development', plugins: [] });
      expect(getCustomConfigMocked).toBeCalledTimes(1);
      expect(HtmlWebpackPluginMocked).not.toBeCalled();
    });

    it('should add html webpack plugin', () => {
      getCustomConfigMocked.mockReturnValueOnce({
        entries: {
          a: { entry: './a.js', template: './a.html' },
          b: { entry: './b.js', template: './b.html' },
        },
      });
      const actual = getProjectConfig({ name: 'test-only' });
      expect(actual.plugins).toEqual(
        expect.arrayContaining([expect.any(HtmlWebpackPlugin), expect.any(HtmlWebpackPlugin)]),
      );
      expect(getCustomConfigMocked).toBeCalledTimes(1);
      expect(HtmlWebpackPluginMocked).toBeCalledWith({
        template: './a.html',
        filename: 'a.html',
        chunks: ['manifest', 'a'],
        favicon: undefined,
        inject: true,
      });
      expect(HtmlWebpackPluginMocked).toBeCalledWith({
        template: './b.html',
        filename: 'b.html',
        chunks: ['manifest', 'b'],
        favicon: undefined,
        inject: true,
      });
      expect(HtmlWebpackPluginMocked).toBeCalledTimes(2);
    });
  });
});
