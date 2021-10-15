import React from 'react';
import { render } from '@testing-library/react';
import Image from '../index';

describe('Image', () => {
  it('should render image', () => {
    render(<Image src="xxx" />);
  });
});
