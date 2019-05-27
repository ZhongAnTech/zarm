import React from 'react';
import Popper from '../popper';
import { PopperProps, TooltipPlacement, TooltipTrigger } from '../popper/PropsType';

class Tootip extends React.Component<PopperProps, any> {
  static defaultProps = {
    prefixCls: 'za-tooltip',
    direction: 'top' as TooltipPlacement,
    trigger: /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) ? 'click' : 'hover' as TooltipTrigger,
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    onVisibleChange: () => {},
  };

  render() {
    const { children, ...others } = this.props;
    delete others.content;

    return (
      <Popper
        popperOptions={{ positionFixed: true }}
        {...others}
      >
        {children}
      </Popper>
    );
  }
}


export default Tootip;
