import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import LocaleProvider from '../index';
import Alert from '../../alert';
import localeCN from '../locale/zh_CN';
import localeEN from '../locale/en_US';
import setTheme, { themes } from '../setTheme';

describe('setTheme', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    document.body.removeAttribute('data-theme');
    Object.keys(themes).forEach((key) => {
      document.documentElement.style.removeProperty(key);
    });
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

describe('ConfigProvider', () => {
  it('should pass', () => {});
});

describe('LocaleProvider', () => {
  it('renders correctly with zh_CN', () => {
    const wrapper = render(
      <LocaleProvider locale={localeCN}>
        <Alert />
      </LocaleProvider>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with en_US', () => {
    const wrapper = render(
      <LocaleProvider locale={localeEN}>
        <Alert />
      </LocaleProvider>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
