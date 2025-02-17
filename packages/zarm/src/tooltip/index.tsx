import { createBEM } from '@zarm-design/bem';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { ConfigContext } from '../config-provider';
import Popper from '../popper';
import type { PopperPlacement, PopperTrigger } from '../popper/interface';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseTooltipProps } from './interface';

export type TooltipPlacement = PopperPlacement;

export type TooltipTrigger = PopperTrigger;

interface refHander {
  update: () => void;
}

export interface TooltipCssVars {
  '--font-size'?: React.CSSProperties['fontSize'];
  '--color'?: React.CSSProperties['color'];
  '--background'?: React.CSSProperties['background'];
  '--zindex'?: React.CSSProperties['zIndex'];
  '--spacing'?: React.CSSProperties['height'];
  '--padding-horizontal'?: React.CSSProperties['paddingLeft'];
  '--padding-vertical'?: React.CSSProperties['paddingTop'];
  '--arrow-size'?: React.CSSProperties['width'];
  '--arrow-horizontal-offset'?: React.CSSProperties['left'];
  '--arrow-vertical-offset'?: React.CSSProperties['top'];
}

export type TooltipProps = BaseTooltipProps & React.PropsWithChildren<HTMLProps<TooltipCssVars>>;

const Tooltip = forwardRef<refHander, TooltipProps>((props, ref) => {
  const { children, content, className, ...others } = props;

  const { prefixCls } = React.useContext(ConfigContext);

  const bem = createBEM('tooltip', { prefixCls });
  const cls = bem([className]);

  const poperRef = useRef<React.ElementRef<typeof Popper>>(null);

  useImperativeHandle(ref, () => {
    return {
      update: () => {
        return poperRef.current?.update();
      },
    };
  });
  return (
    <Popper content={content!} className={cls} {...others} ref={poperRef}>
      {children}
    </Popper>
  );
});

Tooltip.defaultProps = {
  direction: 'top' as TooltipPlacement,
  hasArrow: true,
  onVisibleChange: () => {},
};

export default Tooltip;
