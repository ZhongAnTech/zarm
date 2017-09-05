import React from 'react';
import { render, shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Popup from '../index';

describe('Popup', () => {
  it('renders correctly', () => {
    const onMaskClick = jest.fn();
    const onClose = jest.fn();
    const wrapper = render(
      <Popup
        direction="bottom"
        onMaskClick={onMaskClick}
        onClose={onClose}>
        foo
      </Popup>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('visible change false', () => {
    const wrapper = mount(
      <Popup>foo</Popup>
    );
    wrapper.setProps({ visible: false });
    jest.useFakeTimers();
    jest.runAllTimers();
    wrapper.unmount();
  });

  it('duration', () => {
    const wrapper = shallow(
      <Popup duration={0}>foo</Popup>
    );
    wrapper.setProps({ visible: true });
  });

  it('autoClose', () => {
    const onMaskClick = jest.fn();
    const onClose = jest.fn();
    const wrapper = mount(
      <Popup
        visible
        autoClose
        onMaskClick={onMaskClick}
        onClose={onClose}>foo</Popup>
    );
    wrapper.setProps({ visible: true });
    jest.useFakeTimers();
    jest.runAllTimers();
  });
});
