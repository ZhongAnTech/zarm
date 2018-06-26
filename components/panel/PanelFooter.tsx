import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { BasePanelFooterProps } from './PropsType';

export interface PanelFooterProps extends BasePanelFooterProps {
  prefixCls?: string;
  className?: string;
}

export default class PanelFooter extends PureComponent<PanelFooterProps, {}> {
  static defaultProps = {
    prefixCls: 'za-panel',
  };

  render() {
    const { prefixCls, className, title, more } = this.props;
    const cls = classnames(`${prefixCls}-footer`, className);

    return (
      <div className={cls}>
        {title && <div className={`${prefixCls}-title`}>{title}</div>}
        {more && <div className={`${prefixCls}-more`}>{more}</div>}
      </div>
    );
  }
}
