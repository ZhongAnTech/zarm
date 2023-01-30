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
});
