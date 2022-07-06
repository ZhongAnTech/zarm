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
  static defaultProps: ConfirmProps = {
    prefixCls: 'za-confirm',
    animationType: 'zoom',
    locale: confirmLocale,
    shape: 'radius',
  };

  render() {
    const {
      prefixCls,
      className,
      content,
      okText,
      cancelText,
      shape,
      onOk,
      onCancel,
      locale,
      ...others
    } = this.props;
    const cls = {
      confirm: classnames(prefixCls, className, {
        [`${prefixCls}--${shape}`]: !!shape,
      }),
    };
    return (
      <div className={cls.confirm}>
        <Modal
          {...others}
          footer={
            <>
              <button type="button" className={`${prefixCls}__button`} onClick={onCancel}>
                {cancelText || locale!.cancelText}
              </button>
              <button
                type="button"
                className={`${prefixCls}__button ${prefixCls}__button--ok`}
                onClick={onOk}
              >
                {okText || locale!.okText}
              </button>
            </>
          }
        >
          {content}
        </Modal>
      </div>
    );
  }
}
