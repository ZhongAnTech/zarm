import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { mocked } from 'ts-jest/utils';
import Calendar from '../index';
import { date7, date2, date6 } from '../../../tests/testData/date';
import parseState from '../utils/parseState';
import DateTool from '../../utils/date';
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
      startMonth: date2,
      endMonth: date6,
      refresh: false,
      steps: 1,
      multiple: false,
    });
    jest.spyOn(DateTool, 'cloneDate').mockReturnValue(date7);
    jest.spyOn(DateTool, 'getMonthCount').mockReturnValue(1);

    const wrapper = mount(
      <Calendar defaultValue={date2} min={date2} max={date6} multiple={false} />,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
