import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Panel from '../index';

describe('Panel', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Panel titleRender="title" moreRender="more">
        body
      </Panel>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
