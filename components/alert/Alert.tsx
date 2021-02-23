import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import Modal from '../modal';
import alertLocale from './locale/zh_CN';

export interface AlertProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Alert extends PureComponent<AlertProps, {}> {
  static defaultProps: AlertProps = {
    prefixCls: 'za-alert',
    animationType: 'zoom',
    locale: alertLocale,
    shape: 'radius',
  };

  render() {
    const { prefixCls, className, content, cancelText, onCancel, locale, shape, ...others } = this.props;
    const cls = {
      alert: classnames(prefixCls, className, {
        [`${prefixCls}--${shape}`]: !!shape,
      }),
    };

    return (
      <div className={cls.alert}>
        <Modal
          {...others}
          footer={(
            <button type="button" className={`${prefixCls}__button`} onClick={onCancel}>
              {cancelText || locale!.cancelText}
            </button>
          )}
        >
          {content}
        </Modal>
      </div>
    );
  }
}
