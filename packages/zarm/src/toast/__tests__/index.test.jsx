import React from 'react';
import { mount } from 'enzyme';
import Toast from '../index';

describe('Toast', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Toast visible>foo</Toast>);
    expect(wrapper).toMatchSnapshot();
  });

  it('visible change true', () => {
    const wrapper = mount(<Toast />);
    wrapper.setProps({ visible: true });
    expect(wrapper).toMatchSnapshot();
  });

  // it('visible change false', () => {
  //   const afterClose = jest.fn();
  //   const wrapper = mount(<Toast visible afterClose={afterClose} />);
  //   wrapper.setProps({ visible: false });
  //   wrapper.simulate('transitionEnd');
  //   wrapper.simulate('animationEnd');
  //   expect(wrapper.state('visible')).toEqual(false);
  //   expect(wrapper).toMatchSnapshot();
  // });

  // it('static function show', () => {
  //   jest.useFakeTimers();
  //   Toast.show('toast内容');
  //   jest.runAllTimers();
  //   const toastContainer = document.getElementsByClassName('za-toast-container');
  //   expect(toastContainer.length).toEqual(1);
  // });

  // it('static function pass params', () => {
  //   jest.useFakeTimers();
  //   Toast.show({
  //     content: 'toast内容',
  //   });
  //   jest.runAllTimers();
  //   const toastContainer = document.getElementsByClassName('za-toast-container');
  //   expect(toastContainer.length).toEqual(1);
  // });

  // it('static function hide', () => {
  //   jest.useFakeTimers();
  //   Toast.show();
  //   jest.runAllTimers();
  //   Toast.hide();
  //   // todo：实现静态方法的动画结束
  //   // const toastContainer = document.getElementsByClassName('toast-container');
  //   // do sth to travel transform
  //   // expect(toastContainer.length).toEqual(0);
  // });
});
