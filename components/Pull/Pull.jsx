import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Events from '../utils/events';
import Drag from '../Drag';
import Spinner from '../Spinner';
import Icon from '../Icon';

const REFRESH_STATE = {
  normal: 0,   // 普通
  pull: 1,     // 下拉状态（未满足刷新条件）
  drop: 2,     // 释放立即刷新（满足刷新条件）
  loading: 3,  // 加载中
  success: 4,  // 加载成功
  failure: 5,  // 加载失败
};

const LOAD_STATE = {
  normal: 0,   // 普通
  abort: 1,    // 中止
  loading: 2,  // 加载中
  success: 3,  // 加载成功
  failure: 4,  // 加载失败
  complete: 5, // 加载完成（无新数据）
};

class Pull extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      offsetY: 0,
      animationDuration: 0,
      refreshState: props.refreshing,
      loadState: props.loading,
    };
  }

  componentDidMount() {
    Events.on(window, 'scroll', this.onScroll);
  }

  componentWillReceiveProps(nextProps) {
    if ('refreshing' in nextProps && nextProps.refreshing !== this.props.refreshing) {
      this.doRefreshAction(nextProps.refreshing);
    }

    if ('loading' in nextProps && nextProps.loading !== this.props.loading) {
      this.doLoadAction(nextProps.loading);
    }
  }

  componentWillUnmount() {
    Events.off(window, 'scroll', this.onScroll);
  }

  onScroll = () => {
    const { refreshState, loadState } = this.state;
    if (refreshState !== REFRESH_STATE.normal) return;
    if (loadState !== LOAD_STATE.normal) return;

    const { onLoad, loadDistance } = this.props;
    if (!onLoad) return;

    const bottom = this.pull.getBoundingClientRect().bottom;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollHeight <= clientHeight) return;

    if (bottom <= clientHeight + loadDistance) {
      typeof onLoad === 'function' && onLoad();
    }
  }

  onDragMove = (event, { offsetY }) => {
    // 未设置刷新事件
    const { onRefresh } = this.props;
    if (!onRefresh) return;

    // 上拉
    if (offsetY < 0) return;

    // 未滚动到顶部
    if (offsetY > 0 && (document.documentElement.scrollTop + document.body.scrollTop) > 0) return;

    // 已经触发过加载状态
    if (this.state.refreshState >= REFRESH_STATE.loading) return;

    // 解决低端安卓系统只触发一次touchmove事件的bug
    event.preventDefault();

    const { refreshDistance, refreshInitDistance } = this.props;
    const offset = offsetY / 2; // 移动距离为拖动距离的一半

    // 判断是否达到释放立即刷新的条件
    const action = ((offset - refreshInitDistance) < refreshDistance)
      ? REFRESH_STATE.pull
      : REFRESH_STATE.drop;

    this.doRefreshAction(action, offset);
    return true;
  }

  onDragEnd = (event, { offsetY }) => {
    const { onRefresh } = this.props;
    const { refreshState } = this.state;

    // 没有产生位移
    if (!offsetY) return;

    // 当前状态为下拉状态时
    if (refreshState === REFRESH_STATE.pull) {
      this.doRefreshAction(REFRESH_STATE.normal);
      return;
    }

    // 执行外部触发刷新的回调
    typeof onRefresh === 'function' && onRefresh();
  }

  /**
   * 执行动画
   * @param  {number} options.offsetY  偏移距离
   * @param  {number} options.animationDuration 动画执行时间
   */
  doTransition = ({ offsetY, animationDuration }) => {
    this.setState({ offsetY, animationDuration });
  }

  /**
   * 执行刷新动作
   * @param  {REFRESH_STATE} refreshState 刷新状态
   * @param  {number}        offsetY      偏移距离
   */
  doRefreshAction = (refreshState, offsetY) => {
    const { animationDuration, stayTime } = this.props;

    this.setState({ refreshState });
    switch (refreshState) {
      case REFRESH_STATE.pull:
      case REFRESH_STATE.drop:
        this.doTransition({ offsetY, animationDuration: 0 });
        break;

      case REFRESH_STATE.loading:
        this.doTransition({ offsetY: 'auto', animationDuration });
        break;

      case REFRESH_STATE.success:
      case REFRESH_STATE.failure:
        this.doTransition({ offsetY: 'auto', animationDuration });
        setTimeout(() => {
          this.doRefreshAction(REFRESH_STATE.normal);
          this.doLoadAction(LOAD_STATE.normal);
        }, stayTime);
        break;

      default:
        this.doTransition({ offsetY: 0, animationDuration });
    }
  }

  /**
   * 执行加载动作
   * @param  {LOAD_STATE} loadState 加载状态
   */
  doLoadAction = (loadState) => {
    const { stayTime } = this.props;
    this.setState({ loadState });

    switch (loadState) {
      case LOAD_STATE.success:
        this.doLoadAction(LOAD_STATE.normal);
        break;

      case LOAD_STATE.failure:
        setTimeout(() => {
          this.doLoadAction(LOAD_STATE.abort);
        }, stayTime);
        break;
    }
  }

  /**
   * 渲染刷新节点
   */
  renderRefresh = () => {
    const { prefixCls, refreshInitDistance, refreshDistance, refreshRender } = this.props;
    const { refreshState, offsetY } = this.state;

    let percent = 0;
    if (offsetY >= refreshInitDistance) {
      percent = (((offsetY - refreshInitDistance) < refreshDistance ? (offsetY - refreshInitDistance) : refreshDistance) * 100) / refreshDistance;
    }

    if (typeof refreshRender === 'function') {
      return refreshRender(refreshState, percent);
    }

    const cls = `${prefixCls}-control`;

    switch (refreshState) {
      case REFRESH_STATE.pull:
        return (
          <div className={cls}>
            <Spinner percent={percent} />
            <span>下拉刷新</span>
          </div>
        );

      case REFRESH_STATE.drop:
        return (
          <div className={cls}>
            <Spinner percent={100} />
            <span>释放立即刷新</span>
          </div>
        );

      case REFRESH_STATE.loading:
        return (
          <div className={cls}>
            <Spinner className="rotate360" />
            <span>加载中</span>
          </div>
        );

      case REFRESH_STATE.success:
        return (
          <div className={cls}>
            <Icon type="right-round" theme="success" />
            <span>加载成功</span>
          </div>
        );

      case REFRESH_STATE.failure:
        return (
          <div className={cls}>
            <Icon type="wrong-round" theme="error" />
            <span>加载失败</span>
          </div>
        );
    }
  }

  /**
   * 渲染加载节点
   */
  renderLoad = () => {
    const { prefixCls, loadRender } = this.props;
    const { loadState } = this.state;

    if (typeof loadRender === 'function') {
      return loadRender(loadState);
    }

    const cls = `${prefixCls}-control`;

    switch (loadState) {
      case LOAD_STATE.loading:
        return (
          <div className={cls}>
            <Spinner className="rotate360" />
            <span>加载中</span>
          </div>
        );

      case LOAD_STATE.failure:
        return (
          <div className={cls}>
            <Icon type="wrong-round" theme="error" />
            <span>加载失败</span>
          </div>
        );

      case LOAD_STATE.complete:
        return (
          <div className={cls}>
            <span>我是有底线的</span>
          </div>
        );
    }
  }

  render() {
    const { prefixCls, className, children } = this.props;
    const { offsetY, animationDuration, refreshState, loadState } = this.state;
    const cls = classnames(`${prefixCls}`, className);

    const refreshCls = classnames(`${prefixCls}-refresh`, {
      [`${prefixCls}-refresh-show`]: refreshState >= REFRESH_STATE.loading,
    });

    const loadCls = classnames(`${prefixCls}-load`, {
      [`${prefixCls}-load-show`]: loadState >= LOAD_STATE.loading,
    });

    const refreshStyle = {
      WebkitTransitionDuration: `${animationDuration}ms`,
      transitionDuration: `${animationDuration}ms`,
    };

    if (refreshState <= REFRESH_STATE.drop) {
      refreshStyle.height = offsetY;
    }

    return (
      <Drag
        onDragMove={this.onDragMove}
        onDragEnd={this.onDragEnd}>
        <div className={cls} ref={(ele) => { this.pull = ele; }}>
          <div className={refreshCls} style={refreshStyle}>
            {this.renderRefresh()}
          </div>
          {children}
          <div className={loadCls}>
            {this.renderLoad()}
          </div>
        </div>
      </Drag>
    );
  }
}

Pull.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  refreshing: PropTypes.number,
  refreshInitDistance: PropTypes.number,
  refreshDistance: PropTypes.number,
  refreshRender: PropTypes.func,
  onRefresh: PropTypes.func,
  loading: PropTypes.number,
  loadDistance: PropTypes.number,
  onLoad: PropTypes.func,
  loadRender: PropTypes.func,
  animationDuration: PropTypes.number,
  stayTime: PropTypes.number,
};

Pull.defaultProps = {
  prefixCls: 'za-pull',
  refreshing: REFRESH_STATE.normal,
  refreshInitDistance: 30,
  refreshDistance: 50,
  loading: LOAD_STATE.normal,
  loadDistance: 10,
  animationDuration: 400,
  stayTime: 1000,
};

export default Pull;
