import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import moment from 'moment-timezone';
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
        // defaultValue={moment('2017-11-03T15:00:00.000Z')}
        defaultValue={new Date(moment.tz('2017-11-03 15:00', 'Asia/Shanghai').format())}
        />
    );
    // wrapper.setProps({ defaultValue: '2017-09-06T12:00:00.000Z' });
    wrapper.setProps({ defaultValue: new Date(moment.tz('2017-09-06 12:00', 'Asia/Shanghai').format()) });
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
