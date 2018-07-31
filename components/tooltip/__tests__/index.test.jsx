import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Tooltip from '../index';

describe('Tooltip', () => {
  it('renders correctly', () => {
    const wrapper = render(<Tooltip message="hello"><span>foo</span></Tooltip>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('visible', () => {
    jest.useFakeTimers();
    const wrapper = mount(<Tooltip visible message="hello"><span>foo</span></Tooltip>);
    expect(toJson(wrapper)).toMatchSnapshot();
    jest.runAllTimers();
    wrapper.unmount();
  });
});
