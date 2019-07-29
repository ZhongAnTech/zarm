import React from 'react';
import Popper from '../popper';
import { PopperProps, PopperPlacement, PopperTrigger } from '../popper/PropsType';

class Tooltip extends React.Component<PopperProps, any> {
  static defaultProps = {
    prefixCls: 'za-tooltip',
    direction: 'top' as PopperPlacement,
    hasArrow: true,
    trigger: /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) ? 'click' : 'hover' as PopperTrigger,
    onVisibleChange: () => {},
  };

  render() {
    const { children, ...others } = this.props;
    delete others.content;

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
