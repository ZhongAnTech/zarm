import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import DatePickerView from '../index';

describe('DatePickerView', () => {
  it('DatePickerView time', () => {
    const wrapper = mount(<DatePickerView mode="datetime" defaultValue="2017-12-3 14:00" />);
    wrapper.setProps({ defaultValue: '2017-9-6 12:00' });
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('DatePickerView time', () => {
    const wrapper = mount(<DatePickerView mode="datetime" min="2007-01-03 11:00" max="2019-11-23 21:00" />);
    wrapper.setProps({ value: '2017-9-6 12:00' });
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
