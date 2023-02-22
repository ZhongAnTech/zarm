import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import DatePicker from '../index';

describe('DatePicker', () => {
  it('snapshot', () => {
    const wrapper = render(<DatePicker />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('should trigger onConfirm when press ok button', () => {
    const onConfirmFn = jest.fn();
    render(<DatePicker value={new Date('2009/3/4')} visible onConfirm={onConfirmFn} />);
    fireEvent.click(document.body.querySelectorAll('.za-picker__confirm')[0]);
    expect(onConfirmFn).toBeCalled();
  });

  it('should trigger onCancel when press cancel button', () => {
    const onCancelFn = jest.fn();

    render(<DatePicker value={new Date('2009/3/4')} visible onCancel={onCancelFn} />);
    fireEvent.click(document.body.querySelectorAll('.za-picker__cancel')[0]);
    expect(onCancelFn).toBeCalled();
  });
});
