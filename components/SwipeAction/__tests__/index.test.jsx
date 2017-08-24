import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import SwipeAction from '../index';

describe('SwipeAction', () => {
  it('renders correctly', () => {
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
  });
});
