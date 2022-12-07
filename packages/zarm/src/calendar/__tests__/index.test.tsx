import React from 'react';
import { fireEvent, getByText, render } from '@testing-library/react';
import Calendar from '../index';

import { date7 } from '../../../tests/testData/date';

describe('Calendar', () => {
  it('should trigger onChange when single click', async () => {
    const onChangeFn = jest.fn();
    const { container } = render(<Calendar min={date7} mode="single" onChange={onChangeFn} />);

    const day2 = [].slice.call(container.getElementsByClassName('za-calendar__day'))[15];
    expect(getByText(day2, '16')).toBeTruthy();
    fireEvent.click(day2);
    expect(onChangeFn).toBeCalled();
  });

  it('should trigger onChange when double click', () => {
    const onChangeFn = jest.fn();
    const { container } = render(
      <Calendar
        mode="range"
        min={new Date('2022-01-01')}
        max={new Date('2022-01-28')}
        onChange={onChangeFn}
      />,
    );

    const days = [].slice.call(container.getElementsByClassName('za-calendar__day'));
    fireEvent.click(days[27]);
    fireEvent.click(days[16]);
    expect(onChangeFn).toBeCalled();
  });
});
