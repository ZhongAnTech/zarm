import React from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, render, waitFor } from '@testing-library/react';
import ActionSheet, { ActionSheetProps } from '../index';
import zhCN from '../locale/zh_CN';
import enUS from '../locale/en_US';

const props: ActionSheetProps = {
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
    const wrapper = render(<ActionSheet {...props} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('locale', () => {
    expect(zhCN.cancelText).toEqual('取消');
    expect(enUS.cancelText).toEqual('Cancel');
  });


  it('onClick', async () => {
    const click = jest.fn();
    const { getByText } = render(
      <ActionSheet
        visible
        actions = {[
          {
            text: 'item1',
            onClick: () =>{
              click();
            },
          },
        ]}
    />);
    const btn = getByText('item1');
    fireEvent.click(btn);
    await waitFor(() => {
      expect(click).toBeCalled();
    })
  });
});

describe('UseActionSheet', () => {
  const container = document.createElement('div');
  it('mount correctly', () => {
    act(() => {
      const { close } = ActionSheet.show({
        actions: props.actions,
        mountContainer: container,
      });
      expect(container.childNodes.length).toBe(1);
      close();
    });
  });
});
