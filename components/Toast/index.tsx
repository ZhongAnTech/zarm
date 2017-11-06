import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import Mask from '../Mask';

export interface ToastProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Toast extends PureComponent<ToastProps, any> {

  static defaultProps = {
    prefixCls: 'za-toast',
    visible: false,
    stayTime: 3000,
  };

  private timer: number;

  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
    };
  }

  componentDidMount() {
    if (this.props.visible) {
      this.enter(this.props.stayTime, this.props.onMaskClick);
    }
  }

  componentWillReceiveProps(nextProps) {
    clearTimeout(this.timer);

    if (nextProps.visible) {
      this.enter(nextProps.stayTime, nextProps.onMaskClick);
    } else {
      this.leave();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  enter = (stayTime, onMaskClick) => {
    this.setState({
      isShow: true,
    });

    if (stayTime === 0) {
      return;
    }

    this.timer = setTimeout(() => {
      if (typeof onMaskClick === 'function') {
        onMaskClick();
      }
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
