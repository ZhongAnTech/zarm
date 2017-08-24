import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Panel from '../index';

describe('Panel', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Panel>
        <Panel.Header>
          <Panel.Title>title</Panel.Title>
        </Panel.Header>
        <Panel.Body>body</Panel.Body>
      </Panel>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
