import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import Modal from '../modal';
import alertLocale from './locale/zh_CN';
// import { getRunTimeLocale } from '../locale-provider/LocaleProvider';

export interface AlertProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Alert extends PureComponent<AlertProps, {}> {
  static defaultProps = {
    prefixCls: 'za-alert',
    animationType: 'zoom',
    message: '',
    locale: alertLocale,
    destroy: true,
    disableBodyScroll: true,
  };

  render() {
    const { prefixCls, className, message, cancelText, onCancel, locale, ...others } = this.props;
    const cls = classnames(prefixCls, className);

    return (
      <Modal
        className={cls}
        {...others}
        footer={<div className={`${prefixCls}__button`} onClick={onCancel}>{cancelText || locale!.cancelText}</div>}
      >
        {message}
      </Modal>
    );
  }
}
