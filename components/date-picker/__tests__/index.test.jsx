import React from 'react';
import { mount } from 'enzyme';
import { findDOMNode } from 'react-dom';
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

  it('should trigger onOk when press ok button', () => {
    const onOkFn = jest.fn();

    const wrapper = mount(
      <DatePicker
        mode="date"
        value="2009-3-4"
        visible
        onOk={onOkFn}
      />
    );

    wrapper.find('.za-picker-submit').simulate('click');
    expect(onOkFn).toBeCalled();
  });

  it('should trigger onCancel when press cancel button', () => {
    const onOkFn = jest.fn();
    const onCancelFn = jest.fn();

    const wrapper = mount(
      <DatePicker
        mode="date"
        value="2009-3-4"
        visible
        onCancel={onCancelFn}
      />
    );

    wrapper.find('.za-picker-cancel').simulate('click');
    expect(onCancelFn).toBeCalled();
    expect(onOkFn).not.toBeCalled();
  });

  // it('should trigger onMaskClick when click mask', () => {
  //   const onMaskClick = jest.fn();

  //   const wrapper = mount(
  //     <DatePicker
  //       mode="date"
  //       value="2009-3-4"
  //       visible
  //       onMaskClick={onMaskClick}
  //     />
  //   );

  //   wrapper.find('.za-mask').simulate('click');
  //   expect(onMaskClick).toBeCalled();
  // });
});
