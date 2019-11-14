import React from 'react';
import { render, shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Drag from '../index';


function createPageXY(x, y) {
  return { pageX: x, pageY: y };
}

function createStartTouchEventObject({ x = 0, y = 0 }) {
  return { touches: [createPageXY(x, y)] };
}

function createMoveTouchEventObject({ x = 0, y = 0 }) {
  return { changedTouches: [createPageXY(x, y)] };
}

describe('Drag', () => {
  it('renders correctly', () => {
    const props = {
      onDragStart: jest.fn(),
      onDragMove: jest.fn(),
      onDragEnd: jest.fn(),
    };
    const wrapper = render(<Drag {...props}><div /></Drag>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('touch event', () => {
    const props = {
      onDragStart: jest.fn(),
      onDragMove: jest.fn(),
      onDragEnd: jest.fn(),
    };
    const wrapper = mount(<Drag {...props}><div /></Drag>);
    wrapper.simulate('touchStart', createStartTouchEventObject({ x: 100, y: 0 }));
    expect(props.onDragStart).toBeCalled();

    wrapper.simulate('touchMove', createMoveTouchEventObject({ x: 150, y: 0 }));
    expect(props.onDragMove).toBeCalled();
    wrapper.simulate('touchEnd', createMoveTouchEventObject({ x: 250, y: 0 }));
    expect(props.onDragEnd).toBeCalled();
  });

  it('event props do not exist', () => {
    const wrapper = shallow(<Drag><div /></Drag>);
    wrapper.simulate('touchStart', {
      touches: [0, 0],
    });
    wrapper.simulate('touchMove', {
      touches: [100, 50],
    });
    wrapper.simulate('touchEnd');
  });
});
