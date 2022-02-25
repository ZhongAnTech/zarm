import * as React from 'react';
import { render } from '@testing-library/react';
import BackTop from '../BackTop';

describe('BackTop', () => {
  it('renders correctly', () => {
    const wrapper = render(<BackTop />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
