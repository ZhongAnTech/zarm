import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import { paramCase, noCase } from 'change-case';
import { BaseIconProps } from './interface';
import createFromIconfont from './IconFont';

export type IconProps = BaseIconProps & { name?: string } & Pick<
    React.HTMLAttributes<HTMLElement>,
    'onClick' | 'className' | 'style'
  >;

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
    mode,
    name = '',
    ...rest
  } = props;

  const bem = createBEM('icon', { prefixCls });

  const decamelizeName = paramCase(name).replace('svg-', '');
  const iconClassName = bem(decamelizeName);
  const isFont = (mode === 'auto' && typeof SVGRect === 'undefined') || mode === 'font';

  const cls = bem([
    {
      [`${theme}`]: !!theme,
      [`${size}`]: !!size,
      'font': isFont,
    },
    className,
    isFont && iconClassName,
  ]);

  const svgProps = {
    width: '1em',
    height: '1em',
    fill: 'currentColor',
    viewBox,
  };

  // iconfont > svg component > children by iconfont

  if (isFont) {
    return <i ref={ref} className={cls} {...rest} />;
  }

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
  mode: 'auto',
};

export default Icon;
