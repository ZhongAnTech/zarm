import React from 'react';
import Popper from '../popper';
import { PopperProps, PopperPlacement } from '../popper/PropsType';

class Tooltip extends React.Component<PopperProps, any> {
  static defaultProps = {
    prefixCls: 'za-tooltip',
    direction: 'top' as PopperPlacement,
    hasArrow: true,
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
