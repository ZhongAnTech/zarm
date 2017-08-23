import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Mask from '../index';

describe('Mask', () => {
  it('renders correctly', () => {
    const wrapper = render(<Mask visible />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
