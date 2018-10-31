import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Popover from '../index';

describe('Popover', () => {
  it('renders correctly', () => {
    const wrapper = render(<Popover message="hello"><span>foo</span></Popover>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('visible', () => {
    jest.useFakeTimers();
    const wrapper = mount(<Popover visible message="hello"><span>foo</span></Popover>);
    expect(toJson(wrapper)).toMatchSnapshot();
    jest.runAllTimers();
    wrapper.unmount();
  });
});
