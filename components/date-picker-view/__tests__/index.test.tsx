import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import DatePickerView from '../DatePickerView';
import DatePickerViewEnhanced from '../index';

const date = new Date(1613731706561);

describe('DatePickerView', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('DatePickerView time', () => {
    const getDateSpy = jest.spyOn(DatePickerView.prototype, 'getDate').mockReturnValue(date);
    const wrapper = mount(<DatePickerViewEnhanced mode="datetime" defaultValue="2017-12-3 14:00" />);
    wrapper.setProps({ defaultValue: '2017-9-6 12:00' });
    expect(getDateSpy).toBeCalled();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('DatePickerView time 2', () => {
    const getDateSpy = jest.spyOn(DatePickerView.prototype, 'getDate').mockReturnValue(date);
    const wrapper = mount(<DatePickerViewEnhanced mode="datetime" min="2007-01-03 11:00" max="2019-11-23 21:00" />);
    wrapper.setProps({ value: '2017-9-6 12:00' });
    expect(getDateSpy).toBeCalled();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
