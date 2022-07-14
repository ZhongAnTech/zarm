import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import isFinite from 'lodash/isFinite';
import { ConfigContext } from '../n-config-provider';
import type { BaseMaskProps } from './interface';
import type { HTMLProps } from '../utils/utilityTypes';

const OpacityList = {
  normal: 0.55,
  light: 0.35,
  dark: 0.75,
};

export interface MaskCssVars {
  '--z-index'?: React.CSSProperties['zIndex'];
}

export type MaskProps = BaseMaskProps & HTMLProps<MaskCssVars>;

const Mask = React.forwardRef<HTMLDivElement, MaskProps>((props, ref) => {
  const { className, style, visible, color, opacity, ...restProps } = props;

  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('mask', { prefixCls });

  const rgb = color === 'black' ? '0, 0, 0' : '255, 255, 255';
  const backgroundOpacity = isFinite(opacity) ? opacity : OpacityList[opacity!];

  const maskStyle = {
    ...style,
    backgroundColor: color === 'transparent' ? 'transparent' : `rgba(${rgb}, ${backgroundOpacity})`,
  };

  return visible ? (
    <div ref={ref} className={bem([className])} style={maskStyle} {...restProps} />
  ) : null;
});

Mask.displayName = 'Mask';

Mask.defaultProps = {
  visible: false,
  color: 'black',
  opacity: 'normal',
};

export default Mask;
