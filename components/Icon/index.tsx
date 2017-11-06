import React, { PureComponent } from 'react';
import PropsType from './PropsType';
import classnames from 'classnames';

export interface IconProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Icon extends PureComponent<IconProps, {}> {

  static defaultProps = {
    prefixCls: 'za-icon',
  };

  render() {
    const { prefixCls, type, theme, className, ...others } = this.props;
    const cls = classnames(prefixCls, className, {
      [`${prefixCls}-${type}`]: !!type,
      [`theme-${theme}`]: !!theme,
    });

    return (
      <i {...others} className={cls} />
    );
  }
}
