import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { BaseModalFooterProps } from './PropsType';

export interface ModalFooterProps extends BaseModalFooterProps {
  prefixCls?: string;
  className?: string;
}

export default class ModalFooter extends PureComponent<ModalFooterProps, {}> {
  static defaultProps = {
    prefixCls: 'za-modal',
  };

  render() {
    const { prefixCls, className, block, children, ...others } = this.props;
    const cls = classnames(`${prefixCls}__footer`, className, {
      [`${prefixCls}__footer--block`]: block,
    });

    return (
      <div className={cls} {...others}>
        {children}
      </div>
    );
  }
}
