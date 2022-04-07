/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { mount, render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Alert from '../../alert';
import localeCN from '../locale/zh_CN';
import localeEN from '../locale/en_US';
import setTheme, { themes } from '../setTheme';
import setPrimaryColor from '../setPrimaryColor';
import { ConfigContext } from '../ConfigProvider';

class TestComponent extends React.Component {
  static contextType = ConfigContext;

  render() {
    const { theme } = this.context;
    return <div>{theme}</div>;
  }
}

describe('setTheme', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    document.body.removeAttribute('data-theme');
    document.documentElement.style.cssText = '';
  });
  it('should set dark theme', () => {
    expect.assertions(4 + Object.keys(themes).length);
    const setAttributeSpy = jest.spyOn(document.body, 'setAttribute');
    const setPropertySpy = jest.spyOn(document.documentElement.style, 'setProperty');
    setTheme('dark');
    expect(setAttributeSpy).toBeCalledWith('data-theme', 'dark');
    expect(document.body.getAttribute('data-theme')).toEqual('dark');
    Object.keys(themes).forEach((key) => {
      expect(setPropertySpy).toBeCalledWith(key, themes[key]);
    });
    expect(document.documentElement.style).toHaveLength(Object.keys(themes).length);
    expect(document.documentElement.style.cssText).toMatchSnapshot();
  });

  it('should set light theme', () => {
    expect.assertions(4 + Object.keys(themes).length);
    const setAttributeSpy = jest.spyOn(document.body, 'setAttribute');
    const removePropertySpy = jest.spyOn(document.documentElement.style, 'removeProperty');
    setTheme('light');
    expect(setAttributeSpy).toBeCalledWith('data-theme', 'light');
    expect(document.body.getAttribute('data-theme')).toBe('light');
    Object.keys(themes).forEach((key) => {
      expect(removePropertySpy).toBeCalledWith(key);
    });
    expect(document.documentElement.style).toHaveLength(0);
    expect(document.documentElement.style.cssText).toMatchSnapshot();
  });
});

describe('setPrimaryColor', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    document.documentElement.style.cssText = '';
  });
  it('should set primary theme color', () => {
    const setPropertySpy = jest.spyOn(document.documentElement.style, 'setProperty');
    setPrimaryColor('#00bc70');
    expect(setPropertySpy).toBeCalledWith('--theme-primary', '#00bc70');
    expect(setPropertySpy).toBeCalledWith(
      '--theme-primary-dark',
      'hsl(155.70000000000005, 100%, 35%)',
    );
    expect(setPropertySpy).toBeCalledWith(
      '--theme-primary-lighter',
      'hsl(155.70000000000005, 100%, 95%)',
    );
    expect(setPropertySpy).toBeCalledWith(
      '--za-button-primary-shadow-color',
      'rgba(0, 188, 112, 0.3)',
    );
    expect(document.documentElement.style.cssText).toMatchInlineSnapshot(
      `"--theme-primary: #00bc70; --theme-primary-dark: hsl(155.70000000000005, 100%, 35%); --theme-primary-lighter: hsl(155.70000000000005, 100%, 95%); --za-button-primary-shadow-color: rgba(0, 188, 112, 0.3);"`,
    );
  });
});

describe('ConfigProvider', () => {
  describe('snapshot', () => {
    let ConfigProvider: typeof import('../index').default;
    beforeEach(() => {
      ConfigProvider = require('../index').default;
    });
    it('renders correctly with zh_CN', () => {
      const wrapper = render(
        <ConfigProvider locale={localeCN}>
          <Alert />
        </ConfigProvider>,
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders correctly with en_US', () => {
      const wrapper = render(
        <ConfigProvider locale={localeEN}>
          <Alert />
        </ConfigProvider>,
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('behaviour', () => {
    let mod: typeof import('../ConfigProvider');
    let ConfigProvider: typeof mod.default;
    const mSetTheme = jest.fn();
    const mSetPrimaryColor = jest.fn();

    beforeEach(() => {
      jest.resetModules();
      jest.doMock('../setTheme', () => {
        return {
          __esModule: true,
          default: mSetTheme,
        };
      });
      jest.doMock('../setPrimaryColor', () => {
        return {
          __esModule: true,
          default: mSetPrimaryColor,
        };
      });
      mod = require('../ConfigProvider');
      ConfigProvider = mod.default;
    });
    it('should change runtime locale, set theme, set primary theme color with default value', () => {
      const { getRunTimeLocale } = mod;
      const wrapper = shallow(
        <ConfigProvider>
          <></>
        </ConfigProvider>,
      );
      const actual = getRunTimeLocale();
      expect(actual).toEqual({});
      expect(mSetTheme).toBeCalledWith('light');
      expect(mSetPrimaryColor).toBeCalledWith('#00bc70');
      expect(wrapper.prop('value')).toEqual({
        locale: {},
        theme: 'light',
        primaryColor: '#00bc70',
        safeIphoneX: false,
      });
    });

    it('should accept only one child(a React element)', () => {
      expect(() =>
        shallow(
          <ConfigProvider>
            <div />
            <div />
          </ConfigProvider>,
        ),
      ).toThrowError('React.Children.only expected to receive a single React element child.');
    });

    it('should get context from ConfigContext provider', () => {
      const wrapper = mount(
        <ConfigProvider>
          <TestComponent />
        </ConfigProvider>,
      );
      expect(wrapper.find('div').text()).toEqual('light');
    });

    it('should get context from ConfigContext provider', () => {
      const wrapper = mount(
        <ConfigProvider>
          <ConfigContext.Consumer>{(value) => <div>{value.theme}</div>}</ConfigContext.Consumer>
        </ConfigProvider>,
      );
      expect(wrapper.find('div').text()).toEqual('light');
    });
  });
});
