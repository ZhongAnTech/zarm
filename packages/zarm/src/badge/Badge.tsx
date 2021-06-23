import * as React from 'react';
import classnames from 'classnames';
import type { BaseBadgeProps } from './interface';

export interface BadgeProps extends BaseBadgeProps, React.HTMLAttributes<HTMLElement> {
  prefixCls?: string;
}

const Badge = React.forwardRef<unknown, BadgeProps>((props, ref) => {
  const { prefixCls, className, theme, shape, text, children, ...restProps } = props;
  const badgeRef = (ref as any) || React.createRef<HTMLElement>();

  const cls = classnames(prefixCls, className, {
    [`${prefixCls}--${theme}`]: !!theme,
    [`${prefixCls}--${shape}`]: shape,
    [`${prefixCls}--sup`]: !!children,
  });

  return (
    <span ref={badgeRef} className={cls} {...restProps}>
      {children}
      <sup className={`${prefixCls}__content`}>{shape !== 'dot' && text}</sup>
    </span>
  );
});

Badge.displayName = 'Badge';

Badge.defaultProps = {
  prefixCls: 'za-badge',
  shape: 'dot',
  theme: 'danger',
};

export default Badge;
