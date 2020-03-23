import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import ActionSheet from '../index';
import zhCN from '../locale/zh_CN';
import enUS from '../locale/en_US';

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
        theme: 'danger',
        text: '操作三',
        onClick: jest.fn(),
      },
    ],
    onMaskClick: jest.fn(),
    onCancel: jest.fn(),
  };
  it('renders correctly', () => {
    const wrapper = mount(<ActionSheet {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('locale', () => {
    expect(zhCN.cancelText).toEqual('取消');
    expect(enUS.cancelText).toEqual('Cancel');
  });
});
