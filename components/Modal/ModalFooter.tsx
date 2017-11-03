import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { ModalFooterProps } from './PropsType';

export { ModalFooterProps };

export default class ModalFooter extends PureComponent<ModalFooterProps, {}> {

  static defaultProps = {
    prefixCls: 'za-modal',
  };

  render() {
    const { prefixCls, className, children, ...others } = this.props;
    const cls = classnames(`${prefixCls}-footer`, className, {
      // block: true,
    });

    return (
      <div className={cls} {...others}>
        {children}
      </div>
    );
  }
}
