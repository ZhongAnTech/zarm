import React, { HTMLAttributes } from 'react';
import { createBEM } from '@zarm-design/bem';
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

  const bem = createBEM('icon', { prefixCls });
  const decamelizeName = decamelize(name).replace('svg', '');
  const cls = bem([
    {
      [type]: !!type,
      [theme]: !!theme,
      [size]: !!size,
    },
    `${prefixCls}-icon${decamelizeName}`,
    className,
  ]);

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
  prefixCls: 'za',
  theme: 'default',
  size: 'md',
};

export default Font;
