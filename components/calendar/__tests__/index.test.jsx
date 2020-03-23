import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Calendar from '../index';

const prefixCls = 'za-calendar';

describe('Calendar', () => {
  it('calendar render', () => {
    const wrapper = mount(<Calendar defaultValue="2018-08-07" min="2018-05-06" max="2018-10-02" multiple={false} />);
    expect(toJson(wrapper)).toMatchSnapshot();

    const selected = wrapper.find(`.${prefixCls}__day--selected`);
    expect(selected.length).toBe(1);

    const day1 = wrapper.find(`.${prefixCls}__day`).at(20);
    day1.simulate('click');
  });

  it('should trigger onChange when single click', () => {
    const onChangeFn = jest.fn();
    const wrapper = mount(<Calendar min="2018-05-06" multiple={false} onChange={onChangeFn} />);

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

  it('should trigger onChange when update props', () => {
    const onChangeFn = jest.fn();
    const wrapper = mount(<Calendar multiple={false} onChange={onChangeFn} />);

    wrapper.setProps({ multiple: true });

    wrapper.setProps({ min: '2018-06-01' });

    wrapper.setProps({ max: '2018-09-21' });

    wrapper.setProps({ value: ['2018-09-05', '2018-09-08'] });

    wrapper.setProps({ disabledDate: (date) => date.getDate() % 2 === 1 });

    wrapper.setProps({ dateRender: (date) => `$${date.getDate()}` });

    // wrapper.setProps({ dateRender: (date) => date });
  });
});
