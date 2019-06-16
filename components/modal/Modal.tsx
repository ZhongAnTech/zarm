import React, { Component } from 'react';
import classnames from 'classnames';
import { BaseModalProps } from './PropsType';
import Popup from '../popup';

export interface ModalProps extends BaseModalProps {
  prefixCls?: string;
  className?: string;
}

export default class Modal extends Component<ModalProps, any> {
  static Header: any;

  static Body: any;

  static Footer: any;

  static defaultProps = {
    prefixCls: 'za-modal',
    visible: false,
    animationType: 'fade',
    animationDuration: 200,
    width: '70%',
  };

  render() {
    const { prefixCls, className, shape, children, ...others } = this.props;

    const cls = {
      modal: classnames(prefixCls, className, {
        [`${prefixCls}--${shape}`]: !!shape,
      }),
      dialog: classnames(`${prefixCls}__dialog`),
    };

    return (
      <Popup
        className={cls.modal}
        direction="center"
        {...others}
      >
        <div className={cls.dialog}>
          {children}
        </div>
      </Popup>
    );
  }
}
