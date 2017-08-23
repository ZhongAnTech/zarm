import React from 'react';
import { render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ActionSheet from '../index';

describe('ActionSheet', () => {
  it('renders correctly', () => {
    const onMaskClick = jest.fn();
    const onCancel = jest.fn();

    const wrapper = render(
      <ActionSheet
        visible
        onMaskClick={onMaskClick}
        actions={[
          {
            text: '操作一',
            onClick: () => console.log('点击操作一'),
          },
          {
            text: '操作二',
            onClick: () => console.log('点击操作二'),
          },
          {
            theme: 'error',
            text: '操作三',
            onClick: () => console.log('点击操作三'),
          },
        ]}
        onCancel={onCancel}
        />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
