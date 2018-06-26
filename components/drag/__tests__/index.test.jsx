import React from 'react';
import { render } from 'enzyme';
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
});
