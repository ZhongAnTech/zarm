import * as React from 'react';
import classnames from 'classnames';
import type BaseMaskProps from './PropsType';

export interface MaskProps extends React.HTMLAttributes<HTMLDivElement>, BaseMaskProps {
  prefixCls?: string;
}

const Mask = React.forwardRef<unknown, MaskProps>(
  (
    { prefixCls = 'za-mask', className, visible = false, type = 'normal', ...restProps }: MaskProps,
    ref,
  ) => {
    const maskRef = (ref as any) || React.createRef<HTMLDivElement>();

    const maskCls = classnames(prefixCls, className, {
      [`${prefixCls}--${type}`]: !!type,
    });

    return visible ? <div ref={maskRef} className={maskCls} {...restProps} /> : null;
  },
);

export default Mask;
