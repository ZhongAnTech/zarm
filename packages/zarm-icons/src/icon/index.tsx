import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import decamelize from 'decamelize';
import { BaseIconProps } from './interface';
import createFromIconfont from './IconFont';

import '../font/style/icon.scss';

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

  const decamelizeName = decamelize(name, '-').replace('svg', '');
  const isFont = (mode === 'auto' && typeof SVGRect === 'undefined') || mode === 'font';
  const iconClassName = isFont ? `${prefixCls}-icon${decamelizeName}` : '';

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

  if (isFont) {
    return <span {...rest} ref={ref} className={`${cls} ${iconClassName}`} />;
  }

  // svg component > children by iconfont > type
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
