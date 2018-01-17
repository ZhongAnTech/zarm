import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import DatePicker from '../index';
import enLocale from '../locale/en_US';


describe('DatePicker', () => {
  it('DatePicker trigger maskClick', () => {
    const onMaskClickFn = jest.fn();
    const wrapper = mount(
      <DatePicker
        mode="date"
        value="2009-03-04"
        visible
        onMaskClick={onMaskClickFn}
        />
      );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('.za-mask').simulate('click');
    expect(onMaskClickFn).toBeCalled();
  });
});
