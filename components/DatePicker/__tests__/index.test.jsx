import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import moment from 'moment-timezone';
import DatePicker from '../index';


describe('DatePicker', () => {
  it('DatePicker trigger maskClick', () => {
    const onMaskClickFn = jest.fn();
    moment.tz.setDefault('Asia/Shanghai');
    const wrapper = mount(
      <DatePicker
        mode="date"
        value={moment('2009-03-04')}
        visible
        onMaskClick={onMaskClickFn}
        />
      );
    expect(toJson(wrapper)).toMatchSnapshot();
    // document.body.find('.za-mask').simulate('click');
    // expect(onMaskClickFn).toBeCalled();
  });
});
