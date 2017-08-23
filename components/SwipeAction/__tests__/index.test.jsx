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
            onClick: () => console.log('左按钮1'),
          },
          {
            theme: 'warning',
            text: '左按钮2',
            onClick: () => console.log('左按钮2'),
          },
        ]}
        right={[
          {
            theme: 'error',
            text: '右按钮1',
            onClick: () => console.log('右按钮1'),
          },
          {
            theme: 'success',
            text: '右按钮2',
            onClick: () => console.log('右按钮2'),
          },
        ]}>
        <div>左右都能滑动</div>
      </SwipeAction>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
