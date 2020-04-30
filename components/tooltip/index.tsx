import React from 'react';
import Popper from '../popper';
import BaseTooltipProps from './PropsType';
import { PopperPlacement, PopperTrigger } from '../popper/PropsType';

export interface TooltipProps extends BaseTooltipProps {
  prefixCls?: string;
  className?: string;
  children: React.ReactElement;
}

export type TooltipPlacement = PopperPlacement;

export type TooltipTrigger = PopperTrigger;

class Tooltip extends React.Component<TooltipProps, any> {
  static updateAll() {
    Popper.update();
  }

  static defaultProps = {
    prefixCls: 'za-tooltip',
    direction: 'top' as TooltipPlacement,
    hasArrow: true,
    onVisibleChange: () => {},
  };

  render() {
    const { children, content, ...others } = this.props;

    return !(content === '' || content === null || content === undefined) ? (
      <Popper
        content={content}
        {...others}
      >
        {children}
      </Popper>
    ) : children;
  }
}


export default Tooltip;
