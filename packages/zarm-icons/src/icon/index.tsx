import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import { BaseIconProps } from './interface';
import createFromIconfont from './IconFont';

export type IconProps = BaseIconProps & {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
};

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<IconProps & React.RefAttributes<HTMLElement>> {
  createFromIconfont: typeof createFromIconfont;
}

const Icon = React.forwardRef<HTMLElement, IconProps>((props, ref) => {
  const {
    className,
    prefixCls,
    theme,
    size,
    children,
    component: SvgComponent,
    viewBox,
    ...rest
  } = props;

  const bem = createBEM('icon', { prefixCls });

  const cls = bem([
    {
      [`${theme}`]: !!theme,
      [`${size}`]: !!size,
    },
    className,
  ]);

  const svgProps = {
    width: '1em',
    height: '1em',
    fill: 'currentColor',
    viewBox,
  };

  if (SvgComponent) {
    return (
      <i ref={ref} className={cls} {...rest}>
        <SvgComponent {...svgProps}>{children}</SvgComponent>
      </i>
    );
  }

  if (children) {
    return (
      <i ref={ref} className={cls} {...rest}>
        <svg {...svgProps}>{children}</svg>
      </i>
    );
  }

  return null;
}) as CompoundedComponent;

Icon.createFromIconfont = createFromIconfont;

Icon.displayName = 'Icon';
Icon.defaultProps = {
  prefixCls: 'za',
  viewBox: '0 0 1000 1000',
};

export default Icon;
