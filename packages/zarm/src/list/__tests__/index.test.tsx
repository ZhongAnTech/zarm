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

  it('renders the arrow icon when clickable', () => {
    const { container } = render(
      <List>
        <List.Item title="Item" onClick={jest.fn()} />
      </List>,
    );

    expect(container.querySelector('.za-list-item__arrow.za-icon')).toBeInTheDocument();
  });
});
