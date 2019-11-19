import React, { PureComponent } from 'react';
import classnames from 'classnames';

interface ModalFooterProps {
  prefixCls?: string;
}

export default class ModalFooter extends PureComponent<ModalFooterProps, {}> {
  static defaultProps = {
    prefixCls: 'za-modal',
  };

  render() {
    const { prefixCls, children } = this.props;
    const cls = classnames(`${prefixCls}__footer`);

    return (
      <div className={cls}>
        {children}
      </div>
    );
  }
}
