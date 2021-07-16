import { render, screen } from '@testing-library/react';
import React from 'react';
import Toast from '../index';

describe('Toast', () => {
  it('should renders correctly', () => {
    const { container } = render(<Toast visible />);
    expect(container).toMatchSnapshot();
  });

  it('should show toast if visible prop becomes true', () => {
    const props = {
      content: 'a toast',
    };
    const { rerender } = render(<Toast {...props} />);
    expect(screen.queryByText(/a toast/)).toBeFalsy();
    rerender(<Toast {...props} visible />);
    expect(screen.queryByText(/a toast/)).toBeTruthy();
  });
});
