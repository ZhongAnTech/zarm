import React from 'react';
import { mount } from 'enzyme';
import Loading from '../index';

describe('Loading', () => {
  it('renders correctly', () => {
    const wrapper = mount(
      <Loading visible>foo</Loading>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('visible change true', () => {
    const wrapper = mount(
      <Loading />,
    );
    wrapper.setProps({ visible: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('visible change false', () => {
    const afterClose = jest.fn();
    const wrapper = mount(<Loading visible afterClose={afterClose} />);
    wrapper.setProps({ visible: false });
    wrapper.simulate('transitionEnd');
    wrapper.simulate('animationEnd');
    expect(wrapper.state('visible')).toEqual(false);
    expect(wrapper).toMatchSnapshot();
  });

  it('static function show', () => {
    jest.useFakeTimers();
    Loading.show();
    jest.runAllTimers();
    const LoadingContainer = document.getElementsByClassName('loading-container');
    expect(LoadingContainer.length).toEqual(1);
  });

  it('static function pass params', () => {
    jest.useFakeTimers();
    Loading.show({
      content: <div>loading...</div>,
    });
    jest.runAllTimers();
    const LoadingContainer = document.getElementsByClassName('loading-container');
    expect(LoadingContainer.length).toEqual(1);
  });

  it('static function hide', () => {
    jest.useFakeTimers();
    Loading.show();
    jest.runAllTimers();
    Loading.hide();
    // todo：实现静态方法的动画结束
    // const LoadingContainer = document.getElementsByClassName('Loading-container');
    // do sth to travel transform
    // expect(LoadingContainer.length).toEqual(0);
  });
});
