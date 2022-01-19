import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';
import BasePropsType from './interface';
import decamelize from './util';

import '../font/style/icon.css';

export type IconProps = {
  prefixCls?: string;
  name?: string;
} & BasePropsType &
  HTMLAttributes<HTMLElement>;

const Font = React.forwardRef<HTMLElement, IconProps>((props, ref) => {
  const { className, name, type, style, prefixCls, theme, size, ...rest } = props;
  const decamelizeName = decamelize(name).replace('svg', prefixCls);
  const cls = classnames(prefixCls, className, {
    [`${prefixCls}--${type}`]: !!type,
    [`${prefixCls}--${theme}`]: !!theme,
    [`${prefixCls}--${size}`]: !!size,
    [decamelizeName]: true,
  });

  const newProps = {
    className: cls,
    style,
    type,
    theme,
    size,
    ...rest,
  };
  return <span {...newProps} ref={ref} />;
});

Font.defaultProps = {
  prefixCls: 'za-icon',
  theme: 'default',
  size: 'md',
};

export default Font;
