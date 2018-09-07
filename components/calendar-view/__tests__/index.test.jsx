import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Calendar from '../index';

describe('Calendar', () => {
  it('Calendar render', () => {
    const wrapper = mount(<Calendar defaultValue="2018-08-07" min="2018-05-06" max="2018-10-02" multiple={false} />);
    const day1 = wrapper.find('.comp-day-item').at(15);
    expect(day1.childAt(0).text()).toBe('16');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should trigger onChange when press day', () => {
    const onChangeFn = jest.fn();
    const wrapper = mount(<Calendar multiple={false} onChange={onChangeFn} />);
    const day1 = wrapper.find('.comp-day-item.today');
    expect(day1.length).toBe(1);

    const day2 = wrapper.find('.comp-day-item').at(15);
    expect(day2.childAt(0).text()).toBe('16');
    day2.simulate('click');
    expect(onChangeFn).toBeCalled();
  });

  it('should trigger onChange when update props', () => {
    const onChangeFn = jest.fn();
    const wrapper = mount(<Calendar multiple={false} onChange={onChangeFn} />);

    wrapper.setProps({ min: '2018-09-06', multiple: true });

    const day3 = wrapper.find('.comp-day-item').at(20);
    const day4 = wrapper.find('.comp-day-item').at(30);
    day3.simulate('click');
    day4.simulate('click');
    expect(onChangeFn).toBeCalled();

    wrapper.setProps({ min: '2018-09-06', max: '2018-09-13', multiple: true, value: ['2018-09-09', '2018-09-11'] });

    wrapper.setProps({ disabledDate: date => date.getMonth() % 2 === 1 });

    wrapper.setProps({ dateRender: date => '' });

    wrapper.setProps({ dateRender: date => date });
  });
});
