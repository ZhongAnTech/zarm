import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import SwipeAction from '../index';
import Button from '../../button/index';

describe('SwipeAction', () => {
  it('renders correctly', () => {
    jest.useFakeTimers();
    const wrapper = mount(
      <SwipeAction
        left={[
          <Button theme="primary" onClick={jest.fn()}>左按钮1</Button>,
          <Button theme="warning" onClick={jest.fn()}>左按钮2</Button>,
        ]}
        right={[
          <Button theme="primary" onClick={jest.fn()}>右按钮1</Button>,
          <Button theme="warning" onClick={jest.fn()}>右按钮2</Button>,
        ]}
      >
        <div>左右都能滑动</div>
      </SwipeAction>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    jest.runAllTimers();
    wrapper.unmount();
  });

  it('left only', () => {
    const wrapper = render(
      <SwipeAction
        left={[
          <Button theme="primary" onClick={jest.fn()}>左按钮1</Button>,
          <Button theme="warning" onClick={jest.fn()}>左按钮2</Button>,
        ]}
      >
        <div>右滑</div>
      </SwipeAction>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('right only', () => {
    const wrapper = render(
      <SwipeAction
        right={[
          <Button theme="primary" onClick={jest.fn()}>右按钮1</Button>,
          <Button theme="warning" onClick={jest.fn()}>右按钮2</Button>,
        ]}
      >
        <div>左滑</div>
      </SwipeAction>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
