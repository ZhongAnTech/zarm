import React from 'react';
import { render } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import Calendar from '../index';
import { date2, date6 } from '../../../tests/testData/date';
import parseState from '../utils/parseState';
import CalendarMonthView from '../Month';

jest.mock('../utils/parseState');
const mockedParseState = mocked(parseState);

describe('Calendar snapshot', () => {
  afterAll(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });
  it('calendar render', () => {
    jest.spyOn(CalendarMonthView.prototype, 'checkStatus').mockReturnValue({
      disabled: false,
      isSelected: true,
      isRange: true,
      rangeStart: true,
      rangeEnd: true,
    });
    mockedParseState.mockReturnValue({
      value: [date2, date6],
      min: date2,
      max: date6,
      refresh: false,
      steps: 1,
      mode: 'multiple',
      direction: 'vertical',
    });

    const wrapper = render(
      <Calendar defaultValue={date2} min={date2} max={date6} mode="multiple" />,
    );

    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
