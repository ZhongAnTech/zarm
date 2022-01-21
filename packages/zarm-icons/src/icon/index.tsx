import React, { HTMLAttributes } from 'react';
import { createBEM } from '@zarm-design/bem';
import BasePropsType from './interface';
import createFromIconfont from './IconFont';
import Font from './font';

const INNER_SVG_PROPS = {
  width: '1em',
  height: '1em',
  fill: 'currentColor',
  viewBox: '0 0 32 32',
};

export type IconProps = {
  prefixCls?: string;
  name?: string;
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
    name,
    ...rest
  } = props;

  const bem = createBEM('icon', { prefixCls });

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

  if ((mode === 'auto' && typeof SVGRect === 'undefined') || mode === 'font') {
    return <Font name={name} {...newProps} />;
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
