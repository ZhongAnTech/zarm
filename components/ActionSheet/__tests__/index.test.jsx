import React from 'react';
import { render } from 'enzyme';
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
            onClick: jest.fn(),
          },
          {
            text: '操作二',
            onClick: jest.fn(),
          },
          {
            theme: 'error',
            text: '操作三',
            onClick: jest.fn(),
          },
        ]}
        onCancel={onCancel}
        />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
