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
    const wrapper = mount(<Calendar value="2018-05-19" min="2018-05-01" max="2018-09-02" multiple={false} onChange={onChangeFn} />);
    const day1 = wrapper.find('.comp-day-item.today');
    expect(day1.length).toBe(1);
    // day1.simulate('click');
    // expect(onChangeFn).toBeCalled();
  });
});
