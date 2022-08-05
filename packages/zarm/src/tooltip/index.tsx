import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { createBEM } from '@zarm-design/bem';
import { ConfigContext } from '../n-config-provider';
import Popper from '../popper';
import type { BaseTooltipProps } from './interface';
import type { PopperPlacement, PopperTrigger } from '../popper/interface';

export type TooltipProps = BaseTooltipProps & React.InputHTMLAttributes<HTMLInputElement>;

export type TooltipPlacement = PopperPlacement;

export type TooltipTrigger = PopperTrigger;

const Tooltip = forwardRef<any, TooltipProps>((props, ref) => {
  const { children, content, className, ...others } = props;

  const { prefixCls } = React.useContext(ConfigContext);

  const bem = createBEM('tooltip', { prefixCls });
  const cls = bem([className]);

  const poperRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      update: () => {
        /* @ts-ignore */
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
