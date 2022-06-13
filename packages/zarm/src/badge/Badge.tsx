import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import { ConfigContext } from '../n-config-provider';
import type { BaseBadgeProps } from './interface';
import type { HTMLProps } from '../utils/utilityTypes';

export interface BadgeCssVars {
  '--color'?: React.CSSProperties['background'];
  '--text-color'?: React.CSSProperties['color'];
  '--top'?: string | number;
  '--right'?: string | number;
}

export type BadgeProps = BaseBadgeProps & HTMLProps<BadgeCssVars>;

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const { className, shape, bordered, text, children, ...restProps } = props;
  const badgeRef = ref || React.createRef<HTMLSpanElement>();

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
    <span ref={badgeRef} className={cls} {...restProps}>
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
