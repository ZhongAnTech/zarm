
import React, { Component, PropTypes } from 'react';
import Mask from '../Mask';

class Toast extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timer: undefined
    };
  }

  componentDidMount() {
    // var timer = setTimeout(() => {
    //   this.props.onClose();
    //   this.props.onMaskClick();
    // }, 3000);
    
    // this.setState({
    //   timer : timer
    // });
  }

  componentWillUnmount() {
    clearTimeout(this.state.timer);
  }

  _onContainerClick(e) {
    e.stopPropagation();
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

}

Toast.propTypes = {
  visible     : PropTypes.bool,
  onClose     : PropTypes.func,
  onMaskClick : PropTypes.func,
};

Toast.defaultProps = {
  visible     : false,
  onClose     : function () {},
  onMaskClick : function () {},
};

export default Toast;

