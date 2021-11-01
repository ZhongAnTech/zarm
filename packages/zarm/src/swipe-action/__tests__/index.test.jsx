import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import SwipeAction from '../index';
import Button from '../../button/index';
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
        left={[
          <Button theme="primary" onClick={jest.fn()}>
            左按钮1
          </Button>,
          <Button theme="danger" onClick={jest.fn()}>
            左按钮2
          </Button>,
        ]}
        right={[
          <Button theme="primary" onClick={jest.fn()}>
            右按钮1
          </Button>,
          <Button theme="danger" onClick={jest.fn()}>
            右按钮2
          </Button>,
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
        left={[
          <Button theme="primary" onClick={jest.fn()}>
            左按钮1
          </Button>,
          <Button theme="danger" onClick={jest.fn()}>
            左按钮2
          </Button>,
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
        right={[
          <Button theme="primary" onClick={jest.fn()}>
            右按钮1
          </Button>,
          <Button theme="danger" onClick={jest.fn()}>
            右按钮2
          </Button>,
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
          left={[
            <Button theme="primary" onClick={jest.fn()}>
              左按钮1
            </Button>,
            <Button theme="danger" onClick={jest.fn()}>
              左按钮2
            </Button>,
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
          left={[
            <Button theme="primary" onClick={jest.fn()}>
              左按钮1
            </Button>,
            <Button theme="danger" onClick={jest.fn()}>
              左按钮2
            </Button>,
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
