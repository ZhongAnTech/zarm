
import React, { Component, PropTypes } from 'react';
import Mask from './Mask';

class Toast extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timer: undefined
    };
  }

  componentDidMount() {
    var timer = setTimeout(() => {
      this.props.onClose();
      this.props.onMaskClick();
    }, 3000);
    
    this.setState({
      timer : timer
    });
  }

  componentWillUnmount() {
    clearTimeout(this.state.timer);
  }

  _onContainerClick(e) {
    e.stopPropagation();
  }

  render () {
    const { visible, message, width, onMaskClick, ...others } = this.props;
    const containerStyle = {
      'width' : width,
    };

    return visible ? (
      <div className="ui-toast" {...others}>
        <div className="ui-toast-wrapper" style={containerStyle} onClick={this._onContainerClick}>
          <div className="ui-toast-container">
            {message}
          </div>
        </div>
        <Mask visible={visible} type="transparent" onClose={onMaskClick} />
      </div>
    ) : null;
  }

}

Toast.propTypes = {
  visible     : PropTypes.bool,
  width       : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  onClose     : PropTypes.func,
  onMaskClick : PropTypes.func,
};

Toast.defaultProps = {
  visible     : false,
  width       : '100%',
  onClose     : function () {},
  onMaskClick : function () {},
};

export default Toast;

