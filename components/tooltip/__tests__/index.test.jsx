import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Tooltip from '../index';

describe('Tooltip', () => {
  it('visible', () => {
    jest.useFakeTimers();
    const wrapper = mount(<Tooltip visible title="hello"><span>foo</span></Tooltip>);
    expect(toJson(wrapper)).toMatchSnapshot();
    jest.runAllTimers();
    wrapper.unmount();
  });

  it('direction', () => {
    jest.useFakeTimers();
    const wrapper = mount(<Tooltip direction="top" title="hello"><span>foo</span></Tooltip>);
    expect(toJson(wrapper)).toMatchSnapshot();
    jest.runAllTimers();
    wrapper.unmount();
  });
});
