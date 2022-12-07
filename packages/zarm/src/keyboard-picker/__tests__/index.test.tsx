import React from 'react';
import { render } from '@testing-library/react';
import KeyboardPicker from '../index';

describe('KeyboardPicker', () => {
  describe('snapshot', () => {
    it('renders correctly', () => {
      const { container } = render(<KeyboardPicker />);
      expect(container).toMatchSnapshot();
    });
  });
});
