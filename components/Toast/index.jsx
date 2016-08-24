
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Mask from '../Mask';

class Toast extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      timer: undefined
    };
  }

  componentDidMount() {
    if (this.props.visible) {
      this.enter();
    }
  }

  componentWillReceiveProps (nextProps) {
    clearTimeout(this.state.timer);

    if (!this.props.visible && nextProps.visible) {
      this.enter();
    } else if (this.props.visible && !nextProps.visible) {
      this.leave();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.state.timer);
  }

  render () {
    const { visible, children, onMaskClick, className, ...others } = this.props;

    const cls = classnames({
      'ui-toast'      : true,
      'ui-toast-open' : this.state.isShow,
      [className]     : !!className,
    });

    return (
      <div {...others} className={cls}>
        <div className="ui-toast-container">
          {children}
        </div>
        <Mask visible={visible} type="transparent" onClose={onMaskClick} />
      </div>
    )
  }

  enter() {
    const { duration, onMaskClick } = this.props;

    this.setState({
      isShow: true
    });

    this.state.timer = setTimeout(() => {
      onMaskClick();
      clearTimeout(this.state.timer);
    }, duration);
  }

  leave() {
    this.setState({
      isShow: false
    });
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

