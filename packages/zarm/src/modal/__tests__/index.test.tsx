import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Modal, { ModalProps } from '..';

describe('Modal', () => {
  it('renders correctly', () => {
    const props: ModalProps = {
      onMaskClick: jest.fn(),
      onClose: jest.fn(),
      closable: true,
      title: '标题',
      visible: true,
    };
    const wrapper = render(<Modal {...props}>foo</Modal>);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('onClose', () => {
    const onClose = jest.fn();
    render(
      <Modal visible title="标题" closable onClose={onClose}>
        模态框内容
      </Modal>,
    );
    const close = document.body.querySelector('.za-modal__close') as HTMLDivElement;
    fireEvent.click(close);
    expect(onClose).toBeCalled();
  });

  it('click dialog', () => {
    const onClose = jest.fn();
    render(
      <Modal visible maskClosable onClose={onClose}>
        foo
      </Modal>,
    );
    const mask = document.body.querySelector('.za-mask') as HTMLDivElement;
    fireEvent.click(mask);
    expect(onClose).toBeCalled();
  });

  it('alert', async () => {
    const confirm = jest.fn();
    const { getByText } = render(
      <button
        onClick={() => {
          Modal.alert({
            title: '警告框标题',
            content: '这里是警告框的内容部分',
            onConfirm: confirm,
          });
        }}
      >
        alert
      </button>,
    );

    fireEvent.click(getByText('alert'));
    await waitFor(() => {
      screen.getByText('警告框标题');
    });
    expect(getByText('警告框标题')).toBeInTheDocument();
    fireEvent.click(getByText('确定'));
    await waitFor(() => {
      expect(confirm).toBeCalled();
    });
  });

  it('alert confirm mock return false', async () => {
    const confirm = jest.fn().mockReturnValue(false);
    const { getByText } = render(
      <button
        onClick={() => {
          Modal.alert({
            title: '警告框标题1',
            content: '这里是警告框的内容部分',
            onConfirm: confirm,
            confirmText: '确定1',
          });
        }}
      >
        alert confirm false
      </button>,
    );

    fireEvent.click(getByText('alert confirm false'));
    await waitFor(() => {
      screen.getByText('警告框标题1');
    });
    fireEvent.click(getByText('确定1'));
    await waitFor(() => {
      expect(getByText('警告框标题1')).toBeInTheDocument();
    });
  });

  it('confirm', async () => {
    const confirm = jest.fn();
    const cancel = jest.fn();
    const { getByText } = render(
      <button
        onClick={() => {
          Modal.confirm({
            title: '确认信息',
            content: '这里是确认框的内容部分',
            onConfirm: confirm,
            onCancel: cancel,
            confirmText: 'confirm',
            cancelText: 'cancel',
          });
        }}
      >
        modal confirm
      </button>,
    );

    fireEvent.click(getByText('modal confirm'));
    await waitFor(() => {
      screen.getByText('确认信息');
    });
    fireEvent.click(getByText('confirm'));
    await waitFor(() => {
      expect(confirm).toBeCalled();
    });
    fireEvent.click(getByText('cancel'));
    await waitFor(() => {
      expect(cancel).toBeCalled();
    });
  });

  it('confirm onConfirm onCancel return false', async () => {
    const confirm = jest.fn().mockReturnValue(false);
    const cancel = jest.fn().mockReturnValue(false);
    const fn = jest.fn();
    const { getByText } = render(
      <button
        onClick={async () => {
          await Modal.confirm({
            title: '确认信息1',
            content: '这里是确认框的内容部分1',
            onConfirm: confirm,
            onCancel: cancel,
            confirmText: 'confirm false',
            cancelText: 'cancel false',
          });
          fn();
        }}
      >
        modal confirm false
      </button>,
    );

    fireEvent.click(getByText('modal confirm false'));
    await waitFor(() => {
      screen.getByText('确认信息1');
    });
    fireEvent.click(getByText('confirm false'));
    fireEvent.click(getByText('cancel false'));
    await waitFor(() => {
      expect(fn).toBeCalledTimes(0);
    });
  });
});
