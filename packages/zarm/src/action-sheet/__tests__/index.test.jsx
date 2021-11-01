import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import ActionSheet from '../index';
import zhCN from '../locale/zh_CN';
import enUS from '../locale/en_US';

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

describe('ActionSheet', () => {
  it('renders correctly', () => {
    const wrapper = mount(<ActionSheet {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('locale', () => {
    expect(zhCN.cancelText).toEqual('取消');
    expect(enUS.cancelText).toEqual('Cancel');
  });
});

describe('UseActionSheet', () => {
  const container = document.createElement('div');
  const ac = ActionSheet.useActionSheet();
  it('mount correctly', () => {
    act(() => {
      ac.show({ actions: props.actions, mountContainer: container });
      expect(container.childNodes.length).toBe(1);
      ac.hide();
    });
  });
});
