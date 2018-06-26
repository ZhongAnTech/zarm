import React from 'react';
import { mount } from 'enzyme';
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
    onMaskClick: jest.fn(),
  };

  it('renders correctly', () => {
    const wrapper = mount(<ActionSheet {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  // it('click cancel button', () => {
  //   props.onCancel = jest.fn();
  //   const wrapper = mount(<ActionSheet {...props} />);
  //   document.body.find('.za-actionsheet-cancel').childAt(0).simulate('click');
  //   expect(props.onCancel).toBeCalled();
  // });
});
