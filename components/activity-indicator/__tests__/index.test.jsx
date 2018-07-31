import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import ActivityIndicator from '../index';

describe('ActivityIndicator', () => {
  it('renders correctly', () => {
    const wrapper = render(<ActivityIndicator />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
