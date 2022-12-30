import { fireEvent, getByText, render, waitFor } from '@testing-library/react';
import React from 'react';
import { date7 } from '../../../tests/testData/date';
import ConfigProvider from '../../config-provider';
import enUS from '../../config-provider/locale/en_US';
import Calendar from '../index';

const originalOffsetTop = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetTop');
describe('Calendar', () => {
  it('render horizontal', async () => {
    const onChangeFn = jest.fn();
    const { container } = render(
      <Calendar min={date7} mode="single" onChange={onChangeFn} direction="horizontal" header />,
    );
    expect(container).toMatchSnapshot();
  });

  it('render local EN', async () => {
    const onChangeFn = jest.fn();
    const { container } = render(
      <ConfigProvider locale={enUS}>
        <Calendar min={date7} mode="single" onChange={onChangeFn} />
      </ConfigProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  // const originalWarn = console.warn;
  // // @ts-ignore
  // // eslint-disable-next-line no-return-assign
  // afterEach(() => (console.warn = originalWarn));
  // const consoleOutput: any = [];
  // const mockedWarn = (output) => {
  //   consoleOutput.push(output);
  // };
  // // eslint-disable-next-line no-return-assign
  // beforeEach(() => (console.warn = mockedWarn));

  // it('coustom render days warning', async () => {
  //   const onChangeFn = jest.fn();
  //   render(
  //     <Calendar
  //       min={date7}
  //       mode="single"
  //       onChange={onChangeFn}
  //       dateRender={(date: Date) => {
  //         if (/(0|6)/.test(date.getDay().toString())) {
  //           return {};
  //         }
  //         return date.getDate();
  //       }}
  //     />,
  //   );
  //   await waitFor(() => {
  //     expect(consoleOutput.length).toBeGreaterThan(1);
  //   });
  // });

  // it('render horizontal trigger onChange when picker view', async () => {
  //   const onChangeFn = jest.fn();
  //   const { container } = render(<Calendar
  //     mode="single"
  //     onChange={onChangeFn}
  //     direction="horizontal"
  //     header
  //     defaultValue={new Date('2022-12-01')}
  //   />);
  //   const title = container.getElementsByClassName('za-calendar__title')[0];
  //   fireEvent.click(title);
  //   const pickerView = container.getElementsByClassName('za-picker-view');
  //   expect(pickerView.length).toEqual(1);
  //   const wheelEl = container.getElementsByClassName('za-wheel')[0];
  //   // fireEvent.mouseDown(wheelEl, { pointerId: 1, clientY: 0, buttons: 1 });
  //   // fireEvent.mouseMove(wheelEl, { pointerId: 1, clientY: 400, buttons: 1 });
  //   // fireEvent.mouseUp(wheelEl, { pointerId: 1, clientY:  600});
  //   await waitFor(() => {
  //     console.log( container.getElementsByClassName('za-wheel')[1])
  //     const newTitle = container.getElementsByClassName('za-calendar__title')[0];
  //     expect(newTitle.textContent).toEqual('2023年1月');
  //   });
  // });

  it('render horizontal trigger onChange when action btn click', async () => {
    const onChangeFn = jest.fn();
    const { container } = render(
      <Calendar
        mode="single"
        onChange={onChangeFn}
        direction="horizontal"
        header
        min={new Date('2022-11-01')}
        defaultValue={new Date('2022-12-01')}
      />,
    );
    const btn = container.getElementsByClassName('za-calendar__action-btn');
    fireEvent.click(btn[0]);
    const title = container.getElementsByClassName('za-calendar__title')[0];
    expect(title.textContent).toEqual('2022年11月');
    fireEvent.click(btn[1]);
    fireEvent.click(btn[1]);
    const newTitle = container.getElementsByClassName('za-calendar__title')[0];
    expect(newTitle.textContent).toEqual('2023年1月');
  });

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

  it('should trigger onChange when multiple click', () => {
    const onChangeFn = jest.fn();
    const { container } = render(
      <Calendar
        mode="multiple"
        min={new Date('2022-01-01')}
        max={new Date('2022-01-28')}
        value={[new Date('2022-01-02')]}
        onChange={onChangeFn}
      />,
    );

    const days = [].slice.call(container.getElementsByClassName('za-calendar__day'));
    fireEvent.click(days[2]);
    fireEvent.click(days[16]);
    fireEvent.click(days[16]);
    expect(onChangeFn).toBeCalledTimes(3);
  });

  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetTop', { configurable: true, value: 500 });
  });
  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetTop!);
  });
  it('body scroll', async () => {
    const onChangeFn = jest.fn();
    const { container } = render(
      <Calendar
        mode="multiple"
        min={new Date('2022-01-01')}
        max={new Date('2022-10-28')}
        onChange={onChangeFn}
      />,
    );
    const body = container.getElementsByClassName('za-calendar__body');
    fireEvent.scroll(body[0], { target: { scrollTop: 200 } });
    await waitFor(() => {
      const newTitle = container.getElementsByClassName('za-calendar__scroll-month')[0];
      expect(newTitle.textContent).toEqual('2022年1月');
    });
  });
});
