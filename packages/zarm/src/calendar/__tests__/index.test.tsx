import React from 'react';
import { mount } from 'enzyme';
import Calendar from '../index';
import { date7 } from '../../../tests/testData/date';

describe('Calendar', () => {
  it('should trigger onChange when single click', async () => {
    const onChangeFn = jest.fn();
    const wrapper = mount(<Calendar min={date7} mode="single" onChange={onChangeFn} />);

    const day2 = wrapper.find('.za-calendar__day').at(15);
    expect(day2.childAt(0).text()).toBe('16');
    day2.simulate('click');
    expect(onChangeFn).toBeCalled();
  });

  it('should trigger onChange when double click', () => {
    const onChangeFn = jest.fn();
    const wrapper = mount(
      <Calendar
        mode="range"
        min={new Date('2022-01-01')}
        max={new Date('2022-01-28')}
        onChange={onChangeFn}
      />,
    );

    const day3 = wrapper.find('.za-calendar__day').at(27);
    const day4 = wrapper.find('.za-calendar__day').at(16);
    day3.simulate('click');
    day4.simulate('click');
    expect(onChangeFn).toBeCalled();
  });
});
