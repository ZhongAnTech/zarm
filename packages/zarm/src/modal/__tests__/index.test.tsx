import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Modal, { ModalProps } from '../Modal';

describe('Modal', () => {
  it('renders correctly', () => {
    const props: ModalProps = {
      onMaskClick: jest.fn(),
      onClose: jest.fn(),
      closable: true,
      title: '标题',
      visible: true,
    };
    const { container } = render(<Modal {...props}>foo</Modal>);
    expect(container).toMatchSnapshot();
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
});
