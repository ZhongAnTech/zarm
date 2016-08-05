
import React, { Component, PropTypes } from 'react';
import Mask from '../Mask';

class Toast extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timer: undefined
    };
  }

  componentWillReceiveProps (nextProps) {
    clearTimeout(this.state.timer);

    if (nextProps.visible) {
      this.enter();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.state.timer);
  }

  render () {
    const { visible, children, onMaskClick, ...others } = this.props;

    return (
      <div {...others} className="ui-toast" style={{display: (visible) ? 'flex' : 'none'}}>
        <div className="ui-toast-container">
          {children}
        </div>
        <Mask visible={visible} type="transparent" onClose={onMaskClick} />
      </div>
    )
  }

  enter() {
    const { duration, onMaskClick, } = this.props;

    this.state.timer = setTimeout(() => {
      onMaskClick();
      clearTimeout(this.state.timer);
    }, duration);
  }
}

Toast.propTypes = {
  visible     : PropTypes.bool,
  duration    : PropTypes.number,
  onMaskClick : PropTypes.func,
};

Toast.defaultProps = {
  visible     : false,
  duration    : 3000,
  onMaskClick : () => {},
};

export default Toast;

