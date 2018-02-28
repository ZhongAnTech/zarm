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
        value={new Date(Date.UTC(2009, 2, 4, 0, 0, 0))}
        visible
        onMaskClick={onMaskClickFn}
        />
      );
    expect(toJson(wrapper)).toMatchSnapshot();
    // document.body.find('.za-mask').simulate('click');
    // expect(onMaskClickFn).toBeCalled();
  });
});
