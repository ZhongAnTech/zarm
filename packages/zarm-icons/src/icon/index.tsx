import { createBEM } from '@zarm-design/bem';
import { paramCase } from 'change-case';
import * as React from 'react';
import { IconContext } from '../context';
import createFromIconfont from './IconFont';
import { BaseIconProps } from './interface';

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
    theme,
    size,
    children,
    component: SvgComponent,
    viewBox,
    mode,
    name = '',
    ...rest
  } = props;

  const { prefixCls = 'za' } = React.useContext(IconContext);

  const bem = createBEM('icon', { prefixCls });

  const decamelizeName = paramCase(name).replace('svg-', '');
  const iconClassName = bem(decamelizeName);
  const isFont =
    (mode === 'auto' && typeof SVGRect === 'undefined' && typeof window !== 'undefined') ||
    mode === 'font';

  const cls = bem([
    {
      [`${theme}`]: !!theme,
      [`${size}`]: !!size,
      font: isFont,
    },
    className,
    isFont ? iconClassName : undefined,
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
  viewBox: '0 0 1000 1000',
  mode: 'auto',
};

export default Icon;
