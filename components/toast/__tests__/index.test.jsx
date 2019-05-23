import React from 'react';
import { render, shallow, mount, spyOn } from 'enzyme';
import toJson from 'enzyme-to-json';
import Toast from '../index';

describe('Toast', () => {
  const props = {
    mask: true,
    stayTime: 1,
    onMaskClick: jest.fn(),
  };
  it('renders correctly', () => {
    const wrapper = render(
      <Toast {...props}>foo</Toast>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('visible change false', () => {
    const wrapper = mount(
      <Toast visible>foo</Toast>,
    );
    wrapper.setProps({ visible: false });
  });

  it('stayTime', () => {
    jest.useFakeTimers();
    props.onClose = jest.fn();
    const wrapper = mount(
      <Toast stayTime={5000} visible {...props}>foo</Toast>,
    );
    jest.runAllTimers();
    wrapper.unmount();
  });

  it('stayTime is 0', () => {
    const wrapper = shallow(
      <Toast stayTime={0}>foo</Toast>,
    );
    wrapper.setProps({ visible: true });
  });

  it('static function show', () => {
    const wrapper = Toast.show();
    expect(wrapper).toMatchSnapshot();
  });

  it('static function hide', () => {
    const wrapper = Toast.hide();
    expect(wrapper).toMatchSnapshot();
  });
});
