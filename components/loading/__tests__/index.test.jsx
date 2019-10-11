import React from 'react';
import { render, mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Loading from '../index';

describe('Confirm', () => {
  const props = {
    mask: true,
    stayTime: 1,
    onMaskClick: jest.fn(),
  };
  it('renders correctly', () => {
    const wrapper = render(
      <Loading {...props}>foo</Loading>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('visible change false', () => {
    const wrapper = mount(
      <Loading visible>foo</Loading>,
    );
    wrapper.setProps({ visible: false });
  });

  it('stayTime', () => {
    jest.useFakeTimers();
    props.onClose = jest.fn();
    const wrapper = mount(
      <Loading stayTime={5000} visible {...props}>foo</Loading>,
    );
    jest.runAllTimers();
    wrapper.unmount();
  });

  it('stayTime is 0', () => {
    const wrapper = shallow(
      <Loading stayTime={0}>foo</Loading>,
    );
    wrapper.setProps({ visible: true });
  });

  it('afterClose', () => {
    jest.useFakeTimers();
    const afterClose = jest.fn();
    const wrapper = mount(
      <Loading stayTime={5000} visible {...props} afterClose={afterClose}>foo</Loading>,
    );
    jest.runAllTimers();
    // expect(afterClose).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('static function show', () => {
    const wrapper = Loading.show();
    expect(wrapper).toMatchSnapshot();
  });

  it('static function hide', () => {
    const wrapper = Loading.hide();
    expect(wrapper).toMatchSnapshot();
  });
});
