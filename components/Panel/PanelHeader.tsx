import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { PanelHeaderProps } from './PropsType';

export { PanelHeaderProps };

export default class PanelHeader extends PureComponent<PanelHeaderProps, {}> {

  static defaultProps = {
    prefixCls: 'za-panel',
  };

  render() {
    const { prefixCls, className, title, more } = this.props;
    const cls = classnames(`${prefixCls}-header`, className);

    return (
      <div className={cls}>
        {title && <div className={`${prefixCls}-title`}>{title}</div>}
        {more && <div className={`${prefixCls}-more`}>{more}</div>}
      </div>
    );
  }
}
