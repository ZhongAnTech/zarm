import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import SwipeAction from '../index';
import List from '../../list/index';

function createClientXYObject(x, y) {
  return { clientX: x, clientY: y };
}

function createStartTouchEventObject({ x = 0, y = 0, preventDefault = () => {} }) {
  return {
    touches: [createClientXYObject(x, y)],
    preventDefault,
  };
}

function createMoveTouchEventObject(props) {
  const { x = 0, y = 0, includeTouches = true, preventDefault = () => {} } = props;
  const moveTouchEvent = {
    changedTouches: [createClientXYObject(x, y)],
    preventDefault,
  };
  if (includeTouches) moveTouchEvent.touches = [createClientXYObject(x, y)];
  return moveTouchEvent;
}

// function createMouseEventObject({ x = 0, y = 0, preventDefault = () => {} }) {
//   return {
//     ...createClientXYObject(x, y),
//     preventDefault,
//   };
// }

describe('SwipeAction', () => {
  it('renders correctly', () => {
    jest.useFakeTimers();
    const wrapper = mount(
      <SwipeAction
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
    expect(toJson(wrapper)).toMatchSnapshot();
    jest.runAllTimers();
    wrapper.unmount();
  });

  it('left only', () => {
    const wrapper = render(
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
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('right only', () => {
    const wrapper = render(
      <SwipeAction
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
        <div>左滑</div>
      </SwipeAction>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('touch event', () => {
    const props = {
      onOpen: jest.fn(),
      onClose: jest.fn(),
    };
    const wrapper = mount(
      <List>
        <SwipeAction
          {...props}
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
          <List.Item>右滑看看</List.Item>
        </SwipeAction>
      </List>,
    ).find('.za-swipe-action__content');
    wrapper.simulate('touchStart', {
      touches: [10, 0],
    });
    wrapper.simulate('touchMove', {
      touches: [100, 0],
    });
    wrapper.simulate('touchEnd', {
      touches: [10, 0],
    });
  });

  it('touch event callback', () => {
    const onOpen = jest.fn();
    const preventDefault = jest.fn();
    // const props = {
    //   onOpen: jest.fn(),
    //   onClose: jest.fn(),
    // };
    const wrapper = mount(
      <List>
        <SwipeAction
          onOpen={onOpen}
          rightActions={[
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
          <List.Item>右滑看看</List.Item>
        </SwipeAction>
      </List>,
    ).find('.za-swipe-action__content');
    wrapper.simulate('touchStart', createStartTouchEventObject({ x: 0, y: 0, preventDefault }));
    wrapper.simulate('touchMove', createMoveTouchEventObject({ x: 10, y: 0, preventDefault }));
    wrapper.simulate('touchEnd', createMoveTouchEventObject({ x: 275, y: 0, preventDefault }));
    // expect(onOpen).toHaveBeenCalled();
    wrapper.simulate('click');
    // expect(props.onClose).toHaveBeenCalled();
  });
});
