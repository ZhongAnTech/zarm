import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import DatePickerView from '../index';

function fakeTimers() {
  performance.timing = {};
  performance.timing.navigationStart = 0;
}
fakeTimers();

describe('DatePickerView', () => {
  it('DatePickerView time', () => {
    const wrapper = mount(
      <DatePickerView
        title="选择时间"
        placeholder="请选择时间"
        mode="datetime"
        defaultValue="2017-12-3 14:00"
      />,
    );
    wrapper.setProps({ defaultValue: '2017-9-6 12:00' });
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('DatePickerView time', () => {
    const wrapper = mount(
      <DatePickerView
        title="选择日期"
        placeholder="请选择日期"
        mode="datetime"
        min="2007-01-03 11:00"
        max="2019-11-23 21:00"
      />,
    );
    wrapper.setProps({ value: '2017-9-6 12:00' });
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
