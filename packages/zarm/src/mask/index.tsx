import * as React from 'react';
import classnames from 'classnames';
import type { BaseMaskProps } from './interface';

export interface MaskProps extends BaseMaskProps, React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
}

const Mask = React.forwardRef<unknown, MaskProps>((props, ref) => {
  const { prefixCls, className, visible, type, ...restProps } = props;
  const maskRef = (ref as any) || React.createRef<HTMLDivElement>();

  const maskCls = classnames(prefixCls, className, {
    [`${prefixCls}--${type}`]: !!type,
  });

  return visible ? <div ref={maskRef} className={maskCls} {...restProps} /> : null;
});

Mask.displayName = 'Mask';

Mask.defaultProps = {
  prefixCls: 'za-mask',
  type: 'normal',
  visible: false,
};

export default Mask;
