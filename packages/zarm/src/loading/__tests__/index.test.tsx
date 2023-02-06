import { render } from '@testing-library/react';
import React from 'react';
import Loading from '../index';

describe('Loading', () => {
  it('renders correctly', () => {
    const wrapper = render(<Loading loading={false} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('renders spinner correctly', () => {
    const wrapper = render(<Loading type="spinner" />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
