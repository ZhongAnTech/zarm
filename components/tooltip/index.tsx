import React from 'react';
import Popper from '../popper';
import BaseTooltipProps from './PropsType';
import { PopperPlacement, PopperTrigger } from '../popper/PropsType';

export interface TooltipProps extends BaseTooltipProps {
  prefixCls?: string;
  className?: string;
}

export type TooltipPlacement = PopperPlacement;

export type TooltipTrigger = PopperTrigger;

class Tooltip extends React.Component<TooltipProps, any> {
  static defaultProps = {
    prefixCls: 'za-tooltip',
    direction: 'top' as TooltipPlacement,
    hasArrow: true,
    onVisibleChange: () => {},
  };

  static updateAll() {
    Popper.update();
  }

  render() {
    const { children, ...others } = this.props;

    return (
      <Popper
        {...others}
      >
        {children}
      </Popper>
    );
  }
}


export default Tooltip;
