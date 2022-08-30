import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { createBEM } from '@zarm-design/bem';
import { ConfigContext } from '../n-config-provider';
import Popper from '../popper';
import type { BaseTooltipProps } from './interface';
import type { HTMLProps } from '../utils/utilityTypes';
import type { PopperPlacement, PopperTrigger } from '../popper/interface';

export type TooltipPlacement = PopperPlacement;

export type TooltipTrigger = PopperTrigger;

interface refHander {
  update: () => void;
}

export interface TooltipCssVars {
  '--background'?: React.CSSProperties['background'];
  '--padding-horizontal'?: React.CSSProperties['paddingLeft'];
  '--padding-vertical'?: React.CSSProperties['paddingTop'];
  '--color'?: React.CSSProperties['color'];
  '--z-index'?: React.CSSProperties['zIndex'];
  '--arrow-size'?: React.CSSProperties['width'];
  '--font-size'?: React.CSSProperties['fontSize'];
}

export type TooltipProps = BaseTooltipProps & HTMLProps<TooltipCssVars>;

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
  return content ? (
    <Popper content={content!} className={cls} {...others} ref={poperRef}>
      {children}
    </Popper>
  ) : (
    <>{children}</>
  );
});

Tooltip.defaultProps = {
  direction: 'top' as TooltipPlacement,
  hasArrow: true,
  onVisibleChange: () => {},
};

export default Tooltip;
