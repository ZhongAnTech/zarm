import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Keyboard from '../index';
import type { KeyBoardDataSource } from '../interface';

const CAR_PLATE: KeyBoardDataSource = {
  columns: 7,
  keys: [
    {
      text: '沪',
    },
    {
      text: '苏',
    },
    {
      text: '黑',
      disabled: true,
    },
    {
      text: '辽',
      disabled: true,
    },
    {
      text: 'ok',
      rowSpan: 2,
      colSpan: 2,
    },
  ],
};

describe('Keyboard', () => {
  afterEach(cleanup);

  it('should render keyboard dom', () => {
    const { container } = render(<Keyboard data-testid="root" />);
    expect(container).toMatchSnapshot();
    expect(screen.getByTestId('root')).toBeTruthy();
    expect(screen.getByTestId('root').className).toEqual('za-keyboard');
  });

  it('custom keyboard', () => {
    const { container } = render(<Keyboard data-testid="root" dataSource={CAR_PLATE} />);
    expect(container).toMatchSnapshot();
  });

  it('keyboard click', () => {
    const keyClick = jest.fn();
    const { container } = render(<Keyboard data-testid="root" onKeyClick={keyClick} />);
    const keys = container.getElementsByClassName('za-keyboard__item');
    fireEvent.click(keys[0]);
    expect(keyClick).toBeCalledWith('1');
  });

  it('disabled keyboard click', () => {
    const keyClick = jest.fn();
    const { container } = render(
      <Keyboard data-testid="root" onKeyClick={keyClick} dataSource={CAR_PLATE} />,
    );
    const keys = container.getElementsByClassName('za-keyboard__item');
    fireEvent.click(keys[2]);
    expect(keyClick).toBeCalledTimes(0);
    fireEvent.click(keys[1]);
    expect(keyClick).toBeCalledWith('苏');
  });

  it('on Press', () => {
    const keyClick = jest.fn();
    const { container } = render(<Keyboard data-testid="root" onKeyClick={keyClick} />);
    const keys = container.getElementsByClassName('za-keyboard__item');
    fireEvent.mouseDown(keys[3]);
    jest.useFakeTimers();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(keyClick).toBeCalledWith('delete');
  });
});
