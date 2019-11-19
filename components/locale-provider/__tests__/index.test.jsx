import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import LocaleProvider from '../index';
import Alert from '../../alert';
import localeCN from '../locale/zh_CN';

describe('LocaleProvider', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <LocaleProvider locale={localeCN}>
        <Alert />
      </LocaleProvider>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
