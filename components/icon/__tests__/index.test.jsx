import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Icon from '../index';

describe('Icon', () => {
  it('renders correctly', () => {
    const wrapper = render(<Icon type="right" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
