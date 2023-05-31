import React from 'react';
import { render } from '@testing-library/react';
import Dropdown from '../index';

describe('Dropdown', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Dropdown>
        <Dropdown.Item key="1" title="Header of Item2">
          This is content of item2.
        </Dropdown.Item>
        <Dropdown.Item key="2" title="Header of Item3">
          This is content of item3.
        </Dropdown.Item>
      </Dropdown>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
