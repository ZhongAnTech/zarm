import * as React from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../n-config-provider';
import type { BaseBadgeProps } from './interface';

export type BadgeProps = BaseBadgeProps & React.HTMLAttributes<HTMLSpanElement>;

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const { className, theme, shape, text, children, ...restProps } = props;
  const badgeRef = ref || React.createRef<HTMLSpanElement>();

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-badge`;

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
  shape: 'dot',
  theme: 'danger',
};

export default Badge;
