import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import LocaleProvider from '../index';
import Alert from '../../alert';
import localeCN from '../locale/zh_CN';
import localeEN from '../locale/en_US';

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
