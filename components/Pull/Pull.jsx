import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Drag from '../Drag';
import Spinner from '../Spinner';
import Icon from '../Icon';

const ACTION_STATE = {
  normal: 0,  // 普通
  pull: 1,    // 下拉状态（未满足刷新条件）
  drop: 2,    // 释放立即刷新（满足刷新条件）
  loading: 3, // 加载中
  success: 4, // 加载成功
  failure: 5, // 加载失败
};

class Pull extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      offsetY: 0,
      duration: 0,
      actionState: props.refreshing
        ? ACTION_STATE.loading
        : ACTION_STATE.normal,
    };
    this.onDragMove = this.onDragMove.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if ('refreshing' in nextProps && nextProps.refreshing !== this.props.refreshing) {
      const actionState = nextProps.refreshing
        ? ACTION_STATE.loading
        : ACTION_STATE.success;

      this.doAction(actionState);
    }
  }

  onDragMove(event, { offsetY }) {
    if (offsetY < 0) return;
    if (document.body.scrollTop > 0) return;
    if (this.state.actionState >= ACTION_STATE.loading) return;

    // 解决低端安卓系统只触发一次touchmove事件的bug
    event.preventDefault();

    // 移动距离为拖动距离的一半
    const offset = offsetY / 2;

    const { refreshDistance, refreshInitDistance } = this.props;
    const action = ((offset - refreshInitDistance) < refreshDistance)
      ? ACTION_STATE.pull
      : ACTION_STATE.drop;

    this.doAction(action, offset);
    return true;
  }

  onDragEnd() {
    const { onRefresh } = this.props;
    const { actionState } = this.state;

    if (actionState === ACTION_STATE.pull) {
      this.doAction(ACTION_STATE.normal);
      return;
    }

    typeof onRefresh === 'function' && onRefresh();
  }

  doTransition({ offsetY, duration }) {
    this.setState({ offsetY, duration });
  }

  doAction(actionState, offset) {
    const { duration, stayTime } = this.props;

    this.setState({ actionState });
    switch (actionState) {
      case ACTION_STATE.pull:
      case ACTION_STATE.drop:
        this.doTransition({ offsetY: offset, duration: 0 });
        break;

      case ACTION_STATE.loading:
        this.doTransition({ offsetY: 50, duration });
        break;

      case ACTION_STATE.success:
        this.doTransition({ offsetY: 50, duration: 0 });
        setTimeout(() => {
          this.doAction(ACTION_STATE.normal);
        }, stayTime);
        break;

      default:
        this.doTransition({ offsetY: 0, duration });
        break;
    }
  }

  renderControlTop(offsetY) {
    const { prefixCls, refreshInitDistance, refreshDistance, refreshRender } = this.props;
    const { actionState } = this.state;

    let percent = 0;
    if (offsetY >= refreshInitDistance) {
      percent = (((offsetY - refreshInitDistance) < refreshDistance ? (offsetY - refreshInitDistance) : refreshDistance) * 100) / refreshDistance;
    }

    if (refreshRender) {
      return refreshRender(actionState, percent);
    }

    const cls = classnames({
      [`${prefixCls}-control`]: true,
    });

    switch (actionState) {
      case ACTION_STATE.pull:
        return (
          <div className={cls}>
            <Spinner percent={percent} />
            <span>下拉刷新</span>
          </div>
        );

      case ACTION_STATE.drop:
        return (
          <div className={cls}>
            <Spinner percent={100} />
            <span>释放立即刷新</span>
          </div>
        );

      case ACTION_STATE.loading:
        return (
          <div className={cls}>
            <Spinner className="rotate360" />
            <span>加载中</span>
          </div>
        );

      case ACTION_STATE.success:
        return (
          <div className={cls}>
            <Icon type="right-round" theme="success" />
            <span>加载成功</span>
          </div>
        );

      default:
        return null;
    }
  }

  render() {
    const { prefixCls, className, children } = this.props;
    const { offsetY, duration } = this.state;

    const classes = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
    });

    const style = {
      WebkitTransitionDuration: `${duration}ms`,
      transitionDuration: `${duration}ms`,
      height: offsetY,
    };

    return (
      <Drag
        onDragMove={this.onDragMove}
        onDragEnd={this.onDragEnd}>
        <div className={classes}>
          <div className={`${prefixCls}-down`} style={style}>
            {this.renderControlTop(offsetY)}
          </div>
          {children}
        </div>
      </Drag>
    );
  }
}

Pull.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  refreshing: PropTypes.bool,
  refreshInitDistance: PropTypes.number,
  refreshDistance: PropTypes.number,
  refreshRender: PropTypes.func,
  onRefresh: PropTypes.func,
  duration: PropTypes.number,
  stayTime: PropTypes.number,
};

Pull.defaultProps = {
  prefixCls: 'za-pull',
  refreshing: false,
  refreshInitDistance: 20,
  refreshDistance: 50,
  duration: 300,
  stayTime: 2000,
};

export default Pull;
