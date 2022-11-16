import React from 'react';
import { render } from '@testing-library/react';
import PinchZoom from '../index';

describe('PinchZoom', () => {
  describe('snapshot', () => {
    it('renders correctly', () => {
      const { container } = render(<PinchZoom />);
      expect(container).toMatchSnapshot();
    });
  });
});
