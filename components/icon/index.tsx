import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import IconProps from './PropsType';
import createFromIconfont from './IconFont';

const innerSvgProps = {
  width: '1em',
  height: '1em',
  fill: 'currentColor',
  viewBox: '0 0 1024 1024',
};

class Icon extends Component<IconProps, {}> {
  static displayName = 'Icon';

  static defaultProps = {
    prefixCls: 'za-button',
    theme: 'default',
    size: 'md',
    children: undefined,
    className: '',
    onClick: undefined,
  };

  static propTypes = {
    /** 类名前缀 */
    prefixCls: PropTypes.string,

    /** 设置主题 */
    theme: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'danger']),

    /** 设置大小 */
    size: PropTypes.oneOf(['lg', 'md', 'sm']),

    /** 内容 */
    children: PropTypes.node,

    /** 自定义css类 */
    className: PropTypes.string,

    /** 点击事件 */
    onClick: PropTypes.func,
  };

  static createFromIconfont = createFromIconfont;

  render() {
    const { prefixcls = 'za-icon', type = '', theme = 'default', size, className = '', style = {}, children, component: SvgComponent, ...rest } = this.props;

    const cls = classnames(prefixcls, className, {
      [`${prefixcls}-${type}`]: !!type,
      [`${prefixcls}--theme-${theme}`]: !!theme,
      [`${prefixcls}--size-${size}`]: !!size,
    });

    const newProps = {
      className: cls,
      style,
      prefixcls,
      type,
      theme,
      size,
      ...rest,
    };

    let innerNode: React.ReactNode;

    if (SvgComponent) {
      innerNode = (<SvgComponent {...innerSvgProps}>{children}</SvgComponent>);
    } else if (children) {
      innerNode = (
        <svg {...innerSvgProps}>
          {children}
        </svg>
      );
    }

    return (
      <i {...newProps}>
        {innerNode}
      </i>
    );
  }
}

export default Icon;
