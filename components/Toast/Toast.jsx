import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Mask from '../Mask';

class Toast extends PureComponent {
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      isShow: false,
    };
  }

  componentDidMount() {
    if (this.props.visible) {
      this.enter(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    clearTimeout(this.timer);

    if (nextProps.visible) {
      this.enter(nextProps);
    } else {
      this.leave();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  enter({ duration, onMaskClick }) {
    this.setState({
      isShow: true,
    });

    if (duration === 0) {
      return;
    }

    this.timer = setTimeout(() => {
      onMaskClick();
      clearTimeout(this.timer);
    }, duration);
  }

  leave() {
    this.setState({
      isShow: false,
    });
  }

  render() {
    const { prefixCls, className, visible, children, onMaskClick } = this.props;

    const classes = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      [`${prefixCls}-open`]: this.state.isShow,
    });

    return (
      <div className={classes}>
        <div className={`${prefixCls}-container`}>
          {children}
        </div>
        <Mask visible={visible} type="transparent" onClose={onMaskClick} />
      </div>
    );
  }
}

Toast.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  visible: PropTypes.bool,
  duration: PropTypes.number, // eslint-disable-line
  onMaskClick: PropTypes.func,
};

Toast.defaultProps = {
  prefixCls: 'zax-toast',
  className: null,
  visible: false,
  duration: 3000,
  onMaskClick() {},
};

export default Toast;
