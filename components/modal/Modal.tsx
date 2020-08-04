import React, { Component } from 'react';
import classnames from 'classnames';
import { BaseModalProps } from './PropsType';
import Popup from '../popup';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import Trigger from '../trigger';

export interface ModalProps extends BaseModalProps {
  prefixCls?: string;
  className?: string;
}

export default class Modal extends Component<ModalProps, any> {
  static alert;

  static confirm;

  static defaultProps: ModalProps = {
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

  onClose = () => {
    const { onCancel } = this.props;
    onCancel && onCancel();
  };

  render() {
    const { visible, prefixCls, className, shape, children, mountContainer, maskClosable, title, closable, footer, onCancel, ...others } = this.props;

    const cls = {
      modal: classnames(prefixCls, className, {
        [`${prefixCls}--${shape}`]: !!shape,
      }),
      dialog: classnames(`${prefixCls}__dialog`),
    };

    const showHeader = title || closable;
    const noop = () => { };

    return (
      <Trigger visible={visible || false} onClose={this.onClose}>
        <Popup
          visible={visible}
          className={cls.modal}
          direction="center"
          onMaskClick={maskClosable ? onCancel : noop}
          mountContainer={mountContainer}
          {...others}
        >
          <div className={cls.dialog}>
            {showHeader && <ModalHeader title={title} closable={closable} onCancel={onCancel} />}
            <ModalBody>{children}</ModalBody>
            {footer && <ModalFooter>{footer}</ModalFooter>}
          </div>
        </Popup>
      </Trigger>
    );
  }
}
