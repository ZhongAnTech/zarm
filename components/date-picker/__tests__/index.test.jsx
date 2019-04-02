import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import DatePicker from '../index';

function fakeTimers() {
  const timer = jest.useFakeTimers();
  performance.timing = () => {};
}
const timer = fakeTimers();

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
    wrapper.find('.za-date-picker__submit').simulate('click');
    expect(onOkFn).toBeCalled();
  });

  it('should trigger onCancel when press cancel button', () => {
    const onCancelFn = jest.fn();

    const wrapper = mount(
      <DatePicker
        mode="date"
        value="2009-3-4"
        visible
        onCancel={onCancelFn}
      />
    );

    wrapper.find('.za-date-picker__cancel').simulate('click');
    expect(onCancelFn).toBeCalled();
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
