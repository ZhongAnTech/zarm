import * as React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import List from '../index';

describe('List', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <List>
        <List.Item title="Item 1" />
        <List.Item title="Item 2" />
      </List>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
