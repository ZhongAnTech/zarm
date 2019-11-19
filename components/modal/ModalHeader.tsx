import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { BaseModalHeaderProps } from './PropsType';
import Icon from '../icon';

export interface ModalHeaderProps extends BaseModalHeaderProps {
  prefixCls?: string;
  className?: string;
}

export default class ModalHeader extends PureComponent<ModalHeaderProps, {}> {
  static defaultProps = {
    prefixCls: 'za-modal',
  };

  render() {
    const { prefixCls, className, title, closable, onCancel, ...others } = this.props;
    const cls = classnames(`${prefixCls}__header`, className);
    const btnClose = closable && <Icon type="wrong" size="sm" className={`${prefixCls}__header__close`} onClick={onCancel} />;
    return (
      <div className={cls} {...others}>
        <div className={`${prefixCls}__header__title`}>{title}</div>
        {btnClose}
      </div>
    );
  }
}
