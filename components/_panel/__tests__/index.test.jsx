import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Panel from '../index';

describe('Panel', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Panel>
        <Panel.Header title="title" more="more" />
        <Panel.Body>body</Panel.Body>
        <Panel.Footer title="title" more="more" />
      </Panel>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
