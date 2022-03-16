import React, { HTMLAttributes } from 'react';
import { createBEM } from '@zarm-design/bem';
import decamelize from 'decamelize';
import BasePropsType from './interface';
import createFromIconfont from './IconFont';

import '../font/style/icon.scss';

const INNER_SVG_PROPS = {
  width: '1em',
  height: '1em',
  fill: 'currentColor',
  viewBox: '0 0 32 32',
};

export type IconProps = {
  prefixCls?: string;
  name: string;
} & BasePropsType &
  HTMLAttributes<HTMLElement>;

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<IconProps & React.RefAttributes<HTMLElement>> {
  createFromIconfont: typeof createFromIconfont;
}

const Icon = React.forwardRef<HTMLElement, IconProps>((props, ref) => {
  const {
    className,
    type,
    style,
    prefixCls,
    theme,
    size,
    children,
    component: SvgComponent,
    viewBox,
    mode,
    name = '',
    ...rest
  } = props;

  const bem = createBEM('icon', { prefixCls });

  const decamelizeName = decamelize(name, '-').replace('svg', '');
  const isFont = (mode === 'auto' && typeof SVGRect === 'undefined') || mode === 'font';
  const iconClassName = isFont ? `${prefixCls}-icon${decamelizeName}` : '';
  console.log(iconClassName);
  const cls = bem([
    {
      [`${type}`]: !!type,
      [`${theme}`]: !!theme,
      [`${size}`]: !!size,
    },
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

  if (isFont) {
    return <span {...newProps} ref={ref} className={`${cls} ${iconClassName}`} />;
  }

  // svg component > children by iconfont > type
  if (SvgComponent) {
    INNER_SVG_PROPS.viewBox = viewBox!;
    return (
      <i {...newProps} ref={ref}>
        <SvgComponent {...INNER_SVG_PROPS}>{children}</SvgComponent>
      </i>
    );
  }

  if (children) {
    return (
      <i {...newProps} ref={ref}>
        <svg {...INNER_SVG_PROPS}>{children}</svg>
      </i>
    );
  }
  return null;
}) as CompoundedComponent;

Icon.createFromIconfont = createFromIconfont;

Icon.displayName = 'Icon';
Icon.defaultProps = {
  prefixCls: 'za',
  theme: 'default',
  size: 'md',
  viewBox: INNER_SVG_PROPS.viewBox,
  mode: 'auto',
};

export default Icon;
