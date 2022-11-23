import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DatePicker from '../index';

// function fakeTimers() {
//   performance.timing = {};
//   performance.timing.navigationStart = 0;
// }
// fakeTimers();

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

  it('should trigger onConfirm when press ok button', () => {
    const onConfirmFn = jest.fn();
    render(<DatePicker mode="date" value="2009-3-4" visible onConfirm={onConfirmFn} />);
    fireEvent.click(document.body.querySelectorAll('.za-picker__confirm')[0]);
    expect(onConfirmFn).toBeCalled();
  });

  it('should trigger onCancel when press cancel button', () => {
    const onCancelFn = jest.fn();

    render(<DatePicker mode="date" value="2009-3-4" visible onCancel={onCancelFn} />);
    fireEvent.click(document.body.querySelectorAll('.za-picker__cancel')[0]);
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
