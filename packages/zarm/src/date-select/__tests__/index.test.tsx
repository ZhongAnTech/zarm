import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DateSelect from '../index';
import { date1, date2, date3, date4, date5 } from '../../../tests/testData/date';

describe('DateSelect', () => {
  it('DateSelect year', () => {
    const wrapper = render(
      <DateSelect title="选择年份" placeholder="请选择年份" mode="year" value="2017" />,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('DateSelect trigger visible', () => {
    const wrapper = render(<DateSelect mode="date" defaultValue={date1} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('DateSelect disabled', () => {
    const wrapper = render(<DateSelect disabled value={date1} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('DateSelect date', () => {
    const wrapper = render(
      <DateSelect title="选择日期" placeholder="请选择日期" mode="date" value={date1} />,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('DateSelect time', () => {
    const wrapper = render(
      <DateSelect
        title="选择时间"
        placeholder="请选择时间"
        mode="time"
        value={date2}
        minuteStep={15}
      />,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('DateSelect datetime', () => {
    const wrapper = render(
      <DateSelect
        title="选择时间"
        placeholder="请选择时间"
        mode="datetime"
        min={date3}
        max={date4}
        value={date5}
      />,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('should trigger onConfirm when press ok button', () => {
    const onConfirmFn = jest.fn();

    const { getByTestId } = render(
      <div data-testid="date-select">
        <DateSelect mode="date" value="2009-3-4" onConfirm={onConfirmFn} />
      </div>,
    );
    const wrapper = getByTestId('date-select').getElementsByClassName('za-date-select');
    const element = [].slice.call(wrapper);
    fireEvent.click(element?.[0]);
    fireEvent.click(document.body.querySelectorAll('.za-picker__confirm')[0]);
    expect(onConfirmFn).toBeCalled();
  });

  it('should trigger onCancel when press cancel button', () => {
    const onCancelFn = jest.fn();

    const { getByTestId } = render(
      <div data-testid="date-select">
        <DateSelect
          mode="date"
          value="2009-3-4"
          onCancel={onCancelFn}
          className="test-dateSelect"
        />
      </div>,
    );

    const wrapper = getByTestId('date-select').getElementsByClassName('za-date-select');
    const element = [].slice.call(wrapper);
    fireEvent.click(element?.[0]);
    fireEvent.click(document.body.querySelectorAll('.za-picker__cancel')[0]);
    expect(onCancelFn).toBeCalled();
  });

  // it('should trigger onMaskClick when click mask', () => {
  //   const onMaskClick = jest.fn();

  //   const wrapper = mount(
  //     <DateSelect
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
