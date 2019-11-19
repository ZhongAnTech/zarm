import React, { PureComponent } from 'react';
import classnames from 'classnames';

interface ModalBodyProps {
  prefixCls?: string;
  className?: string;
}

export default class ModalBody extends PureComponent<ModalBodyProps, {}> {
  static defaultProps = {
    prefixCls: 'za-modal',
  };

  render() {
    const { prefixCls, className, children } = this.props;
    const cls = classnames(`${prefixCls}__body`, className);

    return (
      <div className={cls}>
        {children}
      </div>
    );
  }
}
