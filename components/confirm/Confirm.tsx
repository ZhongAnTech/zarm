import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import Modal from '../modal';
import confirmLocale from './locale/zh_CN';

export interface ConfirmProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Confirm extends PureComponent<ConfirmProps, {}> {
  static defaultProps = {
    prefixCls: 'za-confirm',
    animationType: 'zoom',
    locale: confirmLocale,
  };

  render() {
    const { prefixCls, className, content, okText, cancelText, onOk, onCancel, locale, ...others } = this.props;
    const cls = classnames(prefixCls, className);
    return (
      <Modal
        className={cls}
        {...others}
        footer={(
          <>
            <button type="button" className={`${prefixCls}__button`} onClick={onCancel}>{cancelText || locale!.cancelText}</button>
            <button type="button" className={`${prefixCls}__button ${prefixCls}__button--ok`} onClick={onOk}>
              {okText || locale!.okText}
            </button>
          </>
        )}
      >
        {content}
      </Modal>
    );
  }
}
