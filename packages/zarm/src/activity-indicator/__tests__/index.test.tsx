import React from 'react';
import { render } from '@testing-library/react';
import ActivityIndicator from '../index';

describe('ActivityIndicator', () => {
  it('renders correctly', () => {
    const wrapper = render(<ActivityIndicator loading={false} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('renders spinner correctly', () => {
    const wrapper = render(<ActivityIndicator type="spinner" />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
