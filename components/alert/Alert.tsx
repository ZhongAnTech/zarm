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
    locale: alertLocale,
    destroy: true,
  };

  render() {
    const { prefixCls, className, content, cancelText, onCancel, locale, ...others } = this.props;
    const cls = classnames(prefixCls, className);

    return (
      <Modal
        className={cls}
        {...others}
        footer={<button type="button" className={`${prefixCls}__button`} onClick={onCancel}>{cancelText || locale!.cancelText}</button>}
      >
        {content}
      </Modal>
    );
  }
}
