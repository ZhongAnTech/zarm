import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import DatePickerView from '../DatePickerView';
import DatePickerViewEnhanced from '../index';

describe('DatePickerView', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('DatePickerView time', () => {
    jest
      .spyOn(DatePickerView.prototype, 'getColsValue')
      .mockReturnValue({ dataSource: [], value: [2021] });
    const wrapper = mount(
      <DatePickerViewEnhanced mode="datetime" defaultValue="2017-12-3 14:00" />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('DatePickerView time 2', () => {
    jest
      .spyOn(DatePickerView.prototype, 'getColsValue')
      .mockReturnValue({ dataSource: [{ label: 1988, value: 1988 }], value: [2021] });
    const wrapper = mount(
      <DatePickerViewEnhanced mode="datetime" min="2007-01-03 11:00" max="2019-11-23 21:00" />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
