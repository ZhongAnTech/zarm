import React from 'react';
import { render, shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Toast from '../index';

describe('Toast', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Toast>foo</Toast>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('visible change false', () => {
    jest.useFakeTimers();
    const wrapper = mount(
      <Toast visible>foo</Toast>
    );
    wrapper.setProps({ visible: false });
    jest.runAllTimers();
    wrapper.unmount();
  });

  it('duration', () => {
    jest.useFakeTimers();
    const wrapper = mount(
      <Toast visible>foo</Toast>
    );
    jest.runAllTimers();
    wrapper.unmount();
  });

  it('duration is 0', () => {
    const wrapper = shallow(
      <Toast duration={0}>foo</Toast>
    );
    wrapper.setProps({ visible: true });
  });
});
