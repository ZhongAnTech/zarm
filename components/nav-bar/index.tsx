import React from 'react';
import classnames from 'classnames';
import BaseNavBarProps from './PropsType';

export interface NavBarProps extends BaseNavBarProps {
  prefixCls?: string;
  className?: string;
}

export default class NavBar extends React.PureComponent<NavBarProps> {
  static displayName = 'NavBar';

  static defaultProps = {
    prefixCls: 'za-nav-bar',
  };

  render() {
    const {
      prefixCls,
      className,
      style,
      title,
      left,
      right,
    } = this.props;
    const cls = classnames(prefixCls, className);
    const titleCls = `${prefixCls}__title`;
    const sideCls = `${prefixCls}__side`;
    const leftCls = `${sideCls} ${prefixCls}__side--left`;
    const rightCls = `${sideCls} ${prefixCls}__side--right`;

    return (
      <div style={style} className={cls}>
        <div className={leftCls}>{left}</div>
        <div className={titleCls}>{title}</div>
        <div className={rightCls}>{right}</div>
      </div>
    );
  }
}
