import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Badge from '../index';

describe('Badge', () => {
  it('renders shape is dot correctly', () => {
    const wrapper = render(<Badge shape="dot" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
