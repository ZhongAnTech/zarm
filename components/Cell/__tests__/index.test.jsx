import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Cell from '../index';

describe('Cell', () => {
  it('renders correctly', () => {
    const wrapper = render(<Cell />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
