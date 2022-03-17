import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import { ConfigContext } from '../n-config-provider';
import type { BaseBadgeProps } from './interface';
import type { HTMLProps } from '../utils/utilityTypes';

export interface BadgeCssVars {
  '--height'?: React.CSSProperties['height'];
  '--font-size'?: React.CSSProperties['fontSize'];
  '--text-color'?: React.CSSProperties['color'];
  '--border-radius'?: React.CSSProperties['borderRadius'];
  '--padding-horizontal'?: React.CSSProperties['padding'];
  '--dot-size'?: React.CSSProperties['width' | 'height'];
  '--sup-offset'?: React.CSSProperties['top'];
}

export type BadgeProps = BaseBadgeProps & HTMLProps<BadgeCssVars>;

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const { className, theme, shape, text, children, ...restProps } = props;
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('badge', { prefixCls });

  const cls = bem([
    {
      [`${theme}`]: !!theme,
      [`${shape}`]: !!shape,
      sup: !!children,
    },
    className,
  ]);

  return (
    <span ref={ref} className={cls} {...restProps}>
      {children}
      <sup className={bem('content')}>{shape !== 'dot' && text}</sup>
    </span>
  );
});

Badge.displayName = 'Badge';

Badge.defaultProps = {
  shape: 'dot',
  theme: 'danger',
};

export default Badge;
