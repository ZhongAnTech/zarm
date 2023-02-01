import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SwipeAction from '../index';
import List from '../../list/index';

const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth');

describe('SwipeAction', () => {
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 500 });
  });
  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth!);
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

  it('touch event callback', async () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    const { container } = render(
      <List>
        <SwipeAction
          onOpen={onOpen}
          onClose={onClose}
          leftActions={[
            {
              text: '左按钮',
              onClick: () => jest.fn(),
            },
          ]}
          rightActions={[
            {
              text: '右按钮',
              onClick: () => jest.fn(),
            },
          ]}
        >
          <List.Item>左右滑看看</List.Item>
        </SwipeAction>
      </List>,
    );
    const element = container.querySelector('.za-swipe-action') as HTMLDivElement;
    fireEvent.mouseDown(element, { pointerId: 1, clientX: 0, clientY: 0, buttons: 1 });
    fireEvent.mouseMove(element, { pointerId: 1, clientX: 200, clientY: 0, buttons: 1 });
    fireEvent.mouseUp(element, { pointerId: 1, clientX: 275 });
    expect(onOpen).toHaveBeenCalled();
    fireEvent.mouseDown(document.body);
    const content = container.querySelector('.za-swipe-action__content');
    fireEvent.transitionEnd(content!);
    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
    fireEvent.mouseDown(element, { pointerId: 1, clientX: 0, clientY: 0, buttons: 1 });
    fireEvent.mouseMove(element, { pointerId: 1, clientX: -200, clientY: 0, buttons: 1 });
    fireEvent.mouseUp(element, { pointerId: 1, clientX: -275 });
    jest.runAllTimers();
    await waitFor(() => {
      expect(onOpen).toBeCalledTimes(2);
    });
    fireEvent.click(content!);
    fireEvent.transitionEnd(content!);
    await waitFor(() => {
      expect(onClose).toBeCalledTimes(2);
    });
  });

  it('SwipeActionItem click', async () => {
    const onClose = jest.fn();
    const onClick = jest.fn();
    const { container } = render(
      <List>
        <SwipeAction
          autoClose
          onClose={onClose}
          leftActions={[
            {
              text: '左按钮1',
              onClick,
            }
          ]}
        >
          <List.Item>右滑看看</List.Item>
        </SwipeAction>
      </List>,
    );
    const element = container.querySelector('.za-swipe-action') as HTMLDivElement;
    // fireEvent.transitionEnd(container.querySelector('.za-swipe-action__content')!);
    fireEvent.mouseDown(element, { pointerId: 1, clientX: 0, clientY: 0, buttons: 1 });
    fireEvent.mouseMove(element, { pointerId: 1, clientX: 200, clientY: 0, buttons: 1 });
    fireEvent.mouseUp(element, { pointerId: 1, clientX: 275 });
    fireEvent.click(container.querySelector('.za-swipe-action-item__item')!);
    await waitFor(() => {
      expect(onClick).toHaveBeenCalled();
    })
  });
});
