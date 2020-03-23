import React, { Component } from 'react';
import classnames from 'classnames';
import { BaseModalProps } from './PropsType';
import Popup from '../popup';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';

export interface ModalProps extends BaseModalProps {
  prefixCls?: string;
  className?: string;
}

export default class Modal extends Component<ModalProps, any> {
  static alert;

  static confirm;

  static defaultProps = {
    prefixCls: 'za-modal',
    visible: false,
    animationType: 'fade',
    animationDuration: 200,
    width: '70%',
    mask: true,
    maskType: 'normal',
    shape: 'radius',
    closable: false,
    maskClosable: false,
    destroy: true,
  };

  render() {
    const { prefixCls, className, shape, children, getContainer, maskClosable, title, closable, footer, onCancel, ...others } = this.props;

    const cls = {
      modal: classnames(prefixCls, className, {
        [`${prefixCls}--${shape}`]: !!shape,
      }),
      dialog: classnames(`${prefixCls}__dialog`),
    };

    const showHeader = title || closable;
    const noop = () => {};

    return (
      <Popup
        className={cls.modal}
        direction="center"
        onMaskClick={maskClosable ? onCancel : noop}
        getContainer={getContainer}
        {...others}
      >
        <div className={cls.dialog}>
          {showHeader && <ModalHeader title={title} closable={closable} onCancel={onCancel} />}
          <ModalBody>{children}</ModalBody>
          {footer && <ModalFooter>{footer}</ModalFooter>}
        </div>
      </Popup>
    );
  }
}
