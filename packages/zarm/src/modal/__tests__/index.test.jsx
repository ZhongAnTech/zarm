import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Modal from '../Modal';

describe('Modal', () => {
  it('renders correctly', () => {
    const onMaskClick = jest.fn();
    const onCancel = jest.fn();

    const { container } = render(
      <Modal visible onMaskClick={onMaskClick} closable title="标题" onCancel={onCancel}>
        foo
      </Modal>,
    );
    expect(container).toMatchSnapshot();
  });

  it('onClose', () => {
    const onClose = jest.fn();
    render(
      <Modal visible title="标题" closable onClose={onClose}>
        模态框内容
      </Modal>,
    );
    const close = document.body.querySelector('.za-modal__close');
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
    const mask = document.body.querySelector('.za-mask');
    fireEvent.click(mask);
    expect(onClose).toBeCalled();
  });
});
