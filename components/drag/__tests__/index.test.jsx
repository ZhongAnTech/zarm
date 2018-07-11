import React from 'react';
import { render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Drag from '../index';

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
    const wrapper = shallow(<Drag {...props}><div /></Drag>);
    wrapper.simulate('touchStart', {
      touches: [0, 0],
    });
    wrapper.simulate('touchMove', {
      touches: [100, 50],
    });
    wrapper.simulate('touchEnd', {
      touches: [200, 100],
    });
  });

  it('event props do not exist', () => {
    const wrapper = shallow(<Drag><div /></Drag>);
    wrapper.simulate('touchStart', {
      touches: [0, 0],
    });
    wrapper.simulate('touchMove', {
      touches: [100, 50],
    });
    wrapper.simulate('touchEnd', {
      touches: [200, 100],
    });
  });
});
