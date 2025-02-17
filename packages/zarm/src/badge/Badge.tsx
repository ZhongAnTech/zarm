import { createBEM } from '@zarm-design/bem';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseBadgeProps } from './interface';

export interface BadgeCssVars {
  '--dot-size'?: string | number;
  '--color'?: React.CSSProperties['background'];
  '--text-color'?: React.CSSProperties['color'];
  '--border-color'?: React.CSSProperties['borderColor'];
  '--font-size'?: React.CSSProperties['fontSize'];
  '--font-weight'?: React.CSSProperties['fontWeight'];
  '--height'?: React.CSSProperties['height'];
  '--padding-horizontal'?: React.CSSProperties['padding'];
  '--border-radius'?: React.CSSProperties['borderRadius'];
  '--top'?: React.CSSProperties['top'];
  '--right'?: React.CSSProperties['right'];
}

export type BadgeProps = BaseBadgeProps & HTMLProps<BadgeCssVars>;

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const { className, shape, bordered, text, children, ...restProps } = props;
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('badge', { prefixCls });

  const cls = bem([
    {
      [`${shape}`]: !!shape,
      sup: !!children,
      bordered,
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
};

export default Badge;
