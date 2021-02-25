import React from 'react';
import { mount } from 'enzyme';
import Calendar from '../index';
import { date7 } from '../../../tests/testData/date';

const prefixCls = 'za-calendar';

describe('Calendar', () => {
  it('should trigger onChange when single click', async () => {
    const onChangeFn = jest.fn();
    const wrapper = mount(<Calendar min={date7} multiple={false} onChange={onChangeFn} />);

    const day2 = wrapper.find(`.${prefixCls}__day`).at(15);
    expect(day2.childAt(0).text()).toBe('16');
    day2.simulate('click');
    expect(onChangeFn).toBeCalled();
  });

  it('should trigger onChange when double click', () => {
    const onChangeFn = jest.fn();
    const wrapper = mount(<Calendar multiple={false} onChange={onChangeFn} />);

    const day3 = wrapper.find(`.${prefixCls}__day`).at(30);
    const day4 = wrapper.find(`.${prefixCls}__day`).at(20);
    day3.simulate('click');
    day4.simulate('click');
    expect(onChangeFn).toBeCalled();
  });
});
