import { render } from '@testing-library/react';
import React from 'react';
import DatePickerView from '../index';

describe('DatePickerView', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('snapshot', () => {
    const wrapper = render(<DatePickerView defaultValue={new Date('2017/12/3 14:00')} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('meridiem hour snapshot', () => {
    const wrapper = render(
      <DatePickerView
        defaultValue={new Date('2017/12/3 14:00')}
        columnType={['meridiem', 'hour', 'minute']}
      />,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('week snapshot', () => {
    const wrapper = render(
      <DatePickerView
        defaultValue={new Date('2017/12/3 14:00')}
        columnType={['year', 'week', 'week-day']}
      />,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('DatePickerView time 3', () => {
    const wrapper = mount(<DatePickerViewEnhanced mode="time" min="11:00" max="21:00" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
