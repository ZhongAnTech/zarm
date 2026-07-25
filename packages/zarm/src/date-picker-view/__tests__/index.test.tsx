import { render } from '@testing-library/react';
import React from 'react';
import DatePickerView from '../index';

const min = new Date('2015/1/1');
const max = new Date('2035/12/31');

describe('DatePickerView', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it('snapshot', () => {
    const wrapper = render(
      <DatePickerView defaultValue={new Date('2017/12/3 14:00')} min={min} max={max} />,
    );
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
        min={min}
        max={max}
        columnType={['year', 'week', 'week-day']}
      />,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('derives min from an explicit max before the default range', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025/2/27 09:00:00'));
    const ref = React.createRef<React.ElementRef<typeof DatePickerView>>();
    const maxBeforeDefaultMin = new Date('2014/12/31 00:00:00');

    const wrapper = render(<DatePickerView ref={ref} max={maxBeforeDefaultMin} />);

    expect(wrapper.getByText('2004年')).toBeInTheDocument();
    expect(wrapper.getByText('2014年')).toBeInTheDocument();
    expect(wrapper.queryByText('2015年')).not.toBeInTheDocument();
    expect(ref.current?.value).toEqual(maxBeforeDefaultMin);
  });
});
