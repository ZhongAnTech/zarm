import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import SwipeAction from '../index';

describe('SwipeAction', () => {
  it('renders correctly', () => {
    jest.useFakeTimers();
    const wrapper = mount(
      <SwipeAction
        left={[
          {
            theme: 'info',
            text: '左按钮1',
            onClick: jest.fn(),
          },
          {
            theme: 'warning',
            text: '左按钮2',
            onClick: jest.fn(),
          },
        ]}
        right={[
          {
            theme: 'error',
            text: '右按钮1',
            onClick: jest.fn(),
          },
          {
            theme: 'success',
            text: '右按钮2',
            onClick: jest.fn(),
          },
        ]}>
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
          {
            theme: 'info',
            text: '左按钮1',
            onClick: jest.fn(),
          },
          {
            theme: 'warning',
            text: '左按钮2',
            onClick: jest.fn(),
          },
        ]}>
        <div>右滑</div>
      </SwipeAction>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('right only', () => {
    const wrapper = render(
      <SwipeAction
        right={[
          {
            theme: 'info',
            text: '左按钮1',
            onClick: jest.fn(),
          },
          {
            theme: 'warning',
            text: '左按钮2',
            onClick: jest.fn(),
          },
        ]}>
        <div>左滑</div>
      </SwipeAction>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
