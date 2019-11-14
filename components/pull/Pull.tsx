import React, { PureComponent, CSSProperties } from 'react';
import classnames from 'classnames';
import { REFRESH_STATE, LOAD_STATE, PullAction, PropsType } from './PropsType';
import Events from '../utils/events';
import Throttle from '../utils/throttle';
import Drag from '../drag';
import ActivityIndicator from '../activity-indicator';
import Icon from '../icon';

export interface PullProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Pull extends PureComponent<PullProps, any> {
  private pull;

  private wrap;

  private throttledScroll;

  static defaultProps: PullProps = {
    prefixCls: 'za-pull',
    refresh: {
      state: REFRESH_STATE.normal,
      startDistance: 30,
      distance: 50,
    },
    load: {
      state: LOAD_STATE.normal,
      distance: 0,
    },
    animationDuration: 400,
    stayTime: 1000,
  };

  constructor(props) {
    super(props);
    this.state = {
      offsetY: 0,
      animationDuration: 0,
      refreshState: props.refresh.state,
      loadState: props.load.state,
    };
    this.throttledScroll = Throttle(this.onScroll, 250);
  }

  componentDidMount() {
    this.wrap = this.getScrollContainer();
    const scroller = (this.wrap === document.documentElement) ? window : this.wrap;
    Events.on(scroller, 'scroll', this.throttledScroll);
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { load, refresh } = nextProps;
    const { prevLoad = {}, prevRefresh = {} } = state;
    if ('load' in nextProps && load.state !== prevLoad.state) {
      return {
        loadState: load.state,
        prevLoad: load,
      };
    }

    if ('refresh' in nextProps && refresh.state !== prevRefresh.state) {
      return {
        refreshState: refresh.state,
        prevRefresh: refresh,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    const { load, refresh } = this.props;
    if (prevProps.load!.state !== load!.state) {
      this.doLoadAction(load!.state);
    }
    if (prevProps.refresh!.state !== refresh!.state) {
      this.doRefreshAction(refresh!.state);
    }
  }

  componentWillUnmount() {
    const scroller = (this.wrap === document.documentElement) ? window : this.wrap;
    Events.off(scroller, 'scroll', this.throttledScroll);
  }

  getScrollContainer = () => {
    return ((node) => {
      while (node && node.parentNode && node.parentNode !== document.body) {
        const style = window.getComputedStyle(node);
        if (['scroll', 'auto'].indexOf(style.overflowY || '') > -1) {
          return node;
        }
        node = node.parentNode;
      }
    })(this.pull) || document.documentElement;
  };

  onScroll = () => {
    const { refreshState, loadState } = this.state;
    const { scrollHeight, scrollTop, clientHeight } = this.wrap;
    const load: PullAction = { ...Pull.defaultProps.load, ...this.props.load };
    const { handler, distance } = load;

    if (
      typeof handler !== 'function'
      || refreshState !== REFRESH_STATE.normal
      || loadState !== LOAD_STATE.normal
      || scrollHeight <= clientHeight

      // 内容高度 - 偏移值 - 修正距离 <= 容器可见高度
      || scrollHeight - (scrollTop + document.body.scrollTop) - distance! > clientHeight
    ) {
      return;
    }
    handler();
  };

  onDragMove = (event, { offsetY }) => {
    const { handler } = this.props.refresh!;
    if (
      // 未设置刷新事件
      !handler

      // 上拉
      || offsetY <= 0

      // 未滚动到顶部
      || (offsetY > 0 && (this.wrap.scrollTop + document.body.scrollTop) > 0)

      // 已经触发过加载状态
      || this.state.refreshState >= REFRESH_STATE.loading
    ) {
      return false;
    }

    // 解决低端安卓系统只触发一次touchmove事件的bug
    event.preventDefault();

    const refresh: PullAction = { ...Pull.defaultProps.refresh, ...this.props.refresh };
    const { startDistance, distance } = refresh;
    const offset = offsetY / 2; // 移动距离为拖动距离的一半

    // 判断是否达到释放立即刷新的条件
    const action = ((offset - startDistance!) < distance!)
      ? REFRESH_STATE.pull
      : REFRESH_STATE.drop;

    this.doRefreshAction(action, offset);
    return true;
  };

  onDragEnd = (_event, { offsetY }) => {
    // 没有产生位移
    if (!offsetY) {
      return;
    }

    // 当前状态为下拉状态时
    const { refreshState } = this.state;
    if (refreshState === REFRESH_STATE.pull) {
      this.doRefreshAction(REFRESH_STATE.normal);
      return;
    }

    // 执行外部触发刷新的回调
    const { handler } = this.props.refresh!;
    if (typeof handler === 'function') {
      handler();
    }
  };

  /**
   * 执行动画
   * @param  {number} options.offsetY  偏移距离
   * @param  {number} options.animationDuration 动画执行时间
   */
  doTransition = ({ offsetY, animationDuration }) => {
    this.setState({ offsetY, animationDuration });
  };

  /**
   * 执行刷新动作
   * @param  {REFRESH_STATE} refreshState 刷新状态
   * @param  {number}        offsetY      偏移距离
   */
  doRefreshAction = (refreshState, offsetY?: number) => {
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
  };

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

      default:
    }
  };

  /**
   * 渲染刷新节点
   */
  renderRefresh = () => {
    const refresh: PullAction = { ...Pull.defaultProps.refresh, ...this.props.refresh };
    const { startDistance, distance, render } = refresh;
    const { refreshState, offsetY } = this.state;

    let percent = 0;
    if (offsetY >= startDistance!) {
      percent = (
        (
          (offsetY - startDistance!) < distance!
            ? offsetY - startDistance!
            : distance
        )! * 100
      ) / distance!;
    }

    if (typeof render === 'function') {
      return render(refreshState, percent);
    }

    const { prefixCls, locale } = this.props;
    const cls = `${prefixCls}__control`;

    switch (refreshState) {
      case REFRESH_STATE.pull:
        return (
          <div className={cls}>
            <ActivityIndicator loading={false} percent={percent} />
            <span>{locale!.pullText}</span>
          </div>
        );

      case REFRESH_STATE.drop:
        return (
          <div className={cls}>
            <ActivityIndicator loading={false} percent={100} />
            <span>{locale!.dropText}</span>
          </div>
        );

      case REFRESH_STATE.loading:
        return (
          <div className={cls}>
            <ActivityIndicator type="spinner" />
            <span>{locale!.loadingText}</span>
          </div>
        );

      case REFRESH_STATE.success:
        return (
          <div className={cls}>
            <Icon type="right-round" theme="success" />
            <span>{locale!.successText}</span>
          </div>
        );

      case REFRESH_STATE.failure:
        return (
          <div className={cls}>
            <Icon type="wrong-round" theme="danger" />
            <span>{locale!.failureText}</span>
          </div>
        );

      default:
    }
  };

  /**
   * 渲染加载节点
   */
  renderLoad = () => {
    const load: PullAction = { ...Pull.defaultProps.load, ...this.props.load };
    const { render } = load;
    const { loadState } = this.state;

    if (typeof render === 'function') {
      return render(loadState);
    }

    const { prefixCls, locale } = this.props;
    const cls = `${prefixCls}__control`;

    switch (loadState) {
      case LOAD_STATE.loading:
        return (
          <div className={cls}>
            <ActivityIndicator type="spinner" />
            <span>{locale!.loadingText}</span>
          </div>
        );

      case LOAD_STATE.failure:
        return (
          <div className={cls}>
            <Icon type="wrong-round" theme="danger" />
            <span>{locale!.failureText}</span>
          </div>
        );

      case LOAD_STATE.complete:
        return (
          <div className={cls}>
            <span>{locale!.completeText}</span>
          </div>
        );

      default:
    }
  };

  render() {
    const { prefixCls, className, children } = this.props;
    const { offsetY, animationDuration, refreshState, loadState } = this.state;
    const cls = classnames(prefixCls, className);

    const loadCls = classnames(`${prefixCls}__load`, {
      [`${prefixCls}__load--show`]: loadState >= LOAD_STATE.loading,
    });

    const contentStyle: CSSProperties = {
      WebkitTransition: `all ${animationDuration}ms`,
      transition: `all ${animationDuration}ms`,
    };

    if (refreshState <= REFRESH_STATE.drop) {
      contentStyle.WebkitTransform = `translate3d(0, ${offsetY}px, 0)`;
      contentStyle.transform = `translate3d(0, ${offsetY}px, 0)`;
    }

    return (
      <Drag
        onDragMove={this.onDragMove}
        onDragEnd={this.onDragEnd}
      >
        <div className={cls}>
          <div className={`${prefixCls}__content`} style={contentStyle} ref={(ele) => { this.pull = ele; }}>
            <div className={`${prefixCls}__refresh`}>
              {this.renderRefresh()}
            </div>
            <div className={`${prefixCls}__body`}>{children}</div>
            <div className={loadCls}>
              {this.renderLoad()}
            </div>
          </div>
        </div>
      </Drag>
    );
  }
}
