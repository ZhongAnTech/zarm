import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { BasePanelProps } from './PropsType';

export interface PanelProps extends BasePanelProps {
  prefixCls?: string;
  className?: string;
}

export default class Panel extends PureComponent<PanelProps, {}> {
  static defaultProps = {
    prefixCls: 'za-panel',
  };

  render() {
    const { prefixCls, className, titleRender, moreRender, children } = this.props;
    const cls = classnames(`${prefixCls}`, className);

    return (
      <div className={cls}>
        <div className={`${prefixCls}-header`}>
          {titleRender && <div className={`${prefixCls}-title`}>{titleRender}</div>}
          {moreRender && <div className={`${prefixCls}-more`}>{moreRender}</div>}
        </div>
        <div className={`${prefixCls}-body`}>{children}</div>
      </div>
    );
  }
}
