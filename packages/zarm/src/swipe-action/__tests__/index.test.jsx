/* eslint-disable no-restricted-syntax */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SwipeAction from '../index';
import List from '../../list/index';

const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth');

describe('SwipeAction', () => {
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 500 });
  });
  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth);
  });
  it('renders correctly', () => {
    jest.useFakeTimers();
    const { container } = render(
      <SwipeAction
        leftActions={[
          {
            text: '左按钮1',
            onClick: () => jest.fn(),
          },
          {
            text: '左按钮2',
            theme: 'danger',
            onClick: () => jest.fn(),
          },
        ]}
        rightActions={[
          {
            text: '右按钮1',
            onClick: () => jest.fn(),
          },
          {
            text: '右按钮2',
            theme: 'danger',
            onClick: () => jest.fn(),
          },
        ]}
      >
        <div>左右都能滑动</div>
      </SwipeAction>,
    );
    expect(container).toMatchSnapshot();
    jest.runAllTimers();
  });

  it('left only', () => {
    const { container } = render(
      <SwipeAction
        leftActions={[
          {
            text: '左按钮1',
            onClick: () => jest.fn(),
          },
          {
            text: '左按钮2',
            theme: 'danger',
            onClick: () => jest.fn(),
          },
        ]}
      >
        <div>右滑</div>
      </SwipeAction>,
    );
    expect(container).toMatchSnapshot();
  });

  it('right only', () => {
    const { container } = render(
      <SwipeAction
        rightActions={[
          {
            text: '右按钮1',
            onClick: () => jest.fn(),
          },
          {
            text: '右按钮2',
            onClick: () => jest.fn(),
          },
        ]}
      >
        <div>左滑</div>
      </SwipeAction>,
    );
    expect(container).toMatchSnapshot();
  });

  // it('touch event', () => {
  //   const props = {
  //     onOpen: jest.fn(),
  //     onClose: jest.fn(),
  //   };
  //   const { container } = render(
  //     <List>
  //       <SwipeAction
  //         {...props}
  //         leftActions={[
  //           {
  //             text: '左按钮1',
  //             onClick: () => jest.fn(),
  //           },
  //           {
  //             text: '左按钮2',
  //             onClick: () => jest.fn(),
  //           },
  //         ]}
  //       >
  //         <List.Item>右滑看看</List.Item>
  //       </SwipeAction>
  //     </List>,
  //   );
  //   const element = container.querySelector('.za-swipe-action__content');

  //   fireEvent.mouseDown(element, { pointerId: 15, clientX: 10, clientY: 0, buttons: 1 });
  //   fireEvent.mouseMove(element, { pointerId: 15, clientX: 100, clientY: 0, buttons: 1 });
  //   fireEvent.mouseUp(element, { pointerId: 15 });
  // });

  it('touch event callback', () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    const { container } = render(
      <List>
        <SwipeAction
          onOpen={onOpen}
          onClose={onClose}
          leftActions={[
            {
              text: '左按钮1',
              onClick: () => jest.fn(),
            },
            {
              text: '左按钮2',
              onClick: () => jest.fn(),
            },
          ]}
        >
          <List.Item>右滑看看</List.Item>
        </SwipeAction>
      </List>,
    );

    // console.error(leftRef.current.offsetWidth);
    const element = container.querySelector('.za-swipe-action');

    fireEvent.mouseDown(element, { pointerId: 1, clientX: 0, clientY: 0, buttons: 1 });
    fireEvent.mouseMove(element, { pointerId: 1, clientX: 200, clientY: 0, buttons: 1 });
    fireEvent.mouseUp(element, { pointerId: 1, clientX: 275 });
    expect(onOpen).toHaveBeenCalled();
  });
});
