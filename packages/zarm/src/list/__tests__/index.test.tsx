import * as React from 'react';
import { render } from '@testing-library/react';
import List from '../index';

describe('List', () => {
  it('renders correctly', () => {
    const { container } = render(
      <List>
        <List.Item title="Item 1" />
        <List.Item title="Item 2" />
      </List>,
    );
    expect(container).toMatchSnapshot();
  });
});
