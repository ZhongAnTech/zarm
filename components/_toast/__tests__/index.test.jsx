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
    const wrapper = mount(
      <Toast visible>foo</Toast>
    );
    wrapper.setProps({ visible: false });
  });

  it('stayTime', () => {
    jest.useFakeTimers();
    const wrapper = mount(
      <Toast stayTime={5000}>foo</Toast>
    );
    wrapper.setProps({ visible: false });
    jest.runAllTimers();
    wrapper.unmount();
  });

  it('stayTime is 0', () => {
    const wrapper = shallow(
      <Toast stayTime={0}>foo</Toast>
    );
    wrapper.setProps({ visible: true });
  });
});
