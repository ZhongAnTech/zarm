import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import DatePicker from '../index';

describe('DatePicker', () => {
  it('DatePicker trigger maskClick', () => {
    const onMaskClickFn = jest.fn();
    const wrapper = mount(
      <DatePicker
        mode="date"
        value="2009-3-4"
        visible
        onMaskClick={onMaskClickFn}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    // document.body.find('.za-mask').simulate('click');
    // expect(onMaskClickFn).toBeCalled();
  });
});
