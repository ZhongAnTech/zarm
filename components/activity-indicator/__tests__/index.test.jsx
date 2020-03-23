import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import ActivityIndicator from '../index';

describe('ActivityIndicator', () => {
  it('renders correctly', () => {
    const wrapper = render(<ActivityIndicator loading={false} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders spinner correctly', () => {
    const wrapper = render(<ActivityIndicator type="spinner" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
