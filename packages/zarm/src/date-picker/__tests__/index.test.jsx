import React from 'react';
import { mount } from 'enzyme';
import DatePicker from '../index';

function fakeTimers() {
  performance.timing = {};
  performance.timing.navigationStart = 0;
}
fakeTimers();

describe('DatePicker', () => {
  // it('DatePicker trigger maskClick', () => {
  //   const onMaskClickFn = jest.fn();
  //   const wrapper = mount(
  //     <DatePicker
  //       mode="date"
  //       value="2009-3-4"
  //       visible
  //       onMaskClick={onMaskClickFn}
  //     />
  //   );
  //   expect(wrapper.find('.za-popup__wrapper')).to.have.lengthOf(1);
  //   // expect(onMaskClickFn).toBeCalled();
  // });

  it('should trigger onOk when press ok button', () => {
    const onOkFn = jest.fn();

    const wrapper = mount(<DatePicker mode="date" value="2009-3-4" visible onOk={onOkFn} />);
    jest.useFakeTimers();
    wrapper.find('.za-date-picker__submit').simulate('click');
    jest.runAllTimers();
    expect(onOkFn).toBeCalled();
  });

  it('should trigger onCancel when press cancel button', () => {
    const onCancelFn = jest.fn();

    const wrapper = mount(
      <DatePicker mode="date" value="2009-3-4" visible onCancel={onCancelFn} />,
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
