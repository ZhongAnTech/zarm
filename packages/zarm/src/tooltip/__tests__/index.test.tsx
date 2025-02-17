import { render } from '@testing-library/react';
import React from 'react';
import Tooltip from '../index';

describe('Tooltip', () => {
  it('renders correctly', () => {
    jest.useFakeTimers();
    const { container } = render(
      <Tooltip direction="top" content="hello">
        <span>foo</span>
      </Tooltip>,
    );
    expect(container).toMatchSnapshot();
    jest.runAllTimers();
  });
});
