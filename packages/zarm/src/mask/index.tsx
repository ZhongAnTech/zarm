import * as React from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../n-config-provider';
import type { BaseMaskProps } from './interface';

export type MaskProps = BaseMaskProps & React.HTMLAttributes<HTMLDivElement>;

const Mask = React.forwardRef<unknown, MaskProps>((props, ref) => {
  const { className, visible, type, ...restProps } = props;
  const maskRef = (ref as any) || React.createRef<HTMLDivElement>();

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-mask`;

  const maskCls = classnames(prefixCls, className, {
    [`${prefixCls}--${type}`]: !!type,
  });

  return visible ? <div ref={maskRef} className={maskCls} {...restProps} /> : null;
});

Mask.displayName = 'Mask';

Mask.defaultProps = {
  type: 'normal',
  visible: false,
};

export default Mask;
