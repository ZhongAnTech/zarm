import React from 'react';
import { render } from '@testing-library/react';
import Panel from '../index';

describe('Panel', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Panel title="title" more="more">
        body
      </Panel>,
    );
    expect(container).toMatchSnapshot();
  });
});
