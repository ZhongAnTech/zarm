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

  enter = ({ stayTime, onMaskClick }) => {
    this.setState({
      isShow: true,
    });

    if (stayTime === 0) return;

    this.timer = setTimeout(() => {
      typeof onMaskClick === 'function' && onMaskClick();
      clearTimeout(this.timer);
    }, stayTime);
  }

  leave = () => {
    this.setState({
      isShow: false,
    });
  }

  render() {
    const { prefixCls, className, visible, children, onMaskClick } = this.props;

    const cls = classnames(`${prefixCls}`, className, {
      [`${prefixCls}-open`]: this.state.isShow,
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
  className: PropTypes.string,
  visible: PropTypes.bool,
  stayTime: PropTypes.number, // eslint-disable-line
  onMaskClick: Mask.propTypes.onClose,
};

Toast.defaultProps = {
  prefixCls: 'za-toast',
  visible: false,
  stayTime: 3000,
};

export default Toast;
