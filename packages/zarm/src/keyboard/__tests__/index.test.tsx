import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import Keyboard from '../index';

describe('Keyboard', () => {
  afterEach(cleanup);

  it('should render keyboard dom', () => {
    const { container } = render(<Keyboard data-testid="root" />);
    expect(container).toMatchSnapshot();
    expect(screen.getByTestId('root')).toBeTruthy();
    expect(screen.getByTestId('root').className).toEqual('za-keyboard');
  });
});
