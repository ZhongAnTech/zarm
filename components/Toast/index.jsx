import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Mask from '../Mask';

class Toast extends PureComponent {

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
    const { prefixCls, visible, children, onMaskClick, className } = this.props;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [`${prefixCls}-open`]: this.state.isShow,
      [className]: !!className,
    });

    return (
      <div className={cls}>
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
  visible: PropTypes.bool,
  duration: PropTypes.number,
  onMaskClick: PropTypes.func,
};

Toast.defaultProps = {
  prefixCls: 'ui-toast',
  visible: false,
  duration: 3000,
  onMaskClick: () => {},
};

export default Toast;
