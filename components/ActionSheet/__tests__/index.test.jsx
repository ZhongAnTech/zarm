import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import ActionSheet from '../index';

describe('ActionSheet', () => {
  const props = {
    visible: true,
    actions: [
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
    ],
    onCancel: jest.fn(),
    onMaskClick: jest.fn(),
  };

  it('renders correctly', () => {
    const wrapper = render(<ActionSheet {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
