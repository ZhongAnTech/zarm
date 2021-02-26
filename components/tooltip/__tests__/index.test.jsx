import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Tooltip from '../index';

describe('Tooltip', () => {
  it('renders correctly', () => {
    jest.useFakeTimers();
    const wrapper = mount(
      <Tooltip direction="top" title="hello">
        <span>foo</span>
      </Tooltip>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    jest.runAllTimers();
    wrapper.unmount();
  });
});
