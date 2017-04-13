
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Mask from '../Mask';

class Toast extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      timer: undefined,
    };
  }

  componentDidMount() {
    if (this.props.visible) {
      this.enter();
    }
  }

  componentWillReceiveProps(nextProps) {
    clearTimeout(this.state.timer);

    if (nextProps.visible) {
      this.enter();
    } else {
      this.leave();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.state.timer);
  }

  enter() {
    const { duration, onMaskClick } = this.props;

    this.setState({
      isShow: true,
    });

    if (duration === 0) {
      return;
    }

    this.state.timer = setTimeout(() => {
      onMaskClick();
      clearTimeout(this.state.timer);
    }, duration);
  }

  leave() {
    this.setState({
      isShow: false,
    });
  }

  render() {
    const { visible, children, onMaskClick, className } = this.props;

    const cls = classnames({
      'ui-toast': true,
      'ui-toast-open': this.state.isShow,
      [className]: !!className,
    });

    return (
      <div className={cls}>
        <div className="ui-toast-container">
          {children}
        </div>
        <Mask visible={visible} type="transparent" onClose={onMaskClick} />
      </div>
    );
  }

}

Toast.propTypes = {
  visible: PropTypes.bool,
  duration: PropTypes.number,
  onMaskClick: PropTypes.func,
};

Toast.defaultProps = {
  visible: false,
  duration: 3000,
  onMaskClick: () => {},
};

export default Toast;
