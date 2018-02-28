import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import DatePickerView from '../index';
import enLocale from '../locale/en_US';

describe('DatePickerView', () => {
  it('DatePickerView time', () => {
    moment.tz.setDefault('Asia/Shanghai');
    const wrapper = mount(
      <DatePickerView
        title="选择时间"
        placeholder="请选择时间"
        mode="datetime"
        // defaultValue={new Date(Date.UTC(2017, 11, 3, 14, 0, 0))}
        defaultValue="2017-12-3 14:00"
        />
    );
    // wrapper.setProps({ defaultValue: new Date(Date.UTC(2017, 8, 6, 12, 0, 0)) });
    wrapper.setProps({ defaultValue: '2017-9-6 12:00' });
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
