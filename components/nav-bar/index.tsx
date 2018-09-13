import React from 'react';
import BaseNavbarProps from './PropsType';

export interface NavBarProps extends BaseNavbarProps {
  prefixCls?: string;
  className?: string;
}

export default class NavBar extends React.PureComponent<NavBarProps> {
  static defaultProps = {
    prefixCls: 'za-nav-bar',
  };

  render() {
    const { style, title, left, right } = this.props;

    return (
      <div style={style}>
        {left}
        {title}
        {right}
      </div>
    );
  }
}
