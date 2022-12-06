import React, { useState, useEffect, useRef, ReactNode, CSSProperties } from 'react';
import { createBEM } from '@zarm-design/bem';
import { useDrag } from '@use-gesture/react';
import {
  SuccessCircle as SuccessCircleIcon,
  WarningCircle as WarningCircleIcon,
} from '@zarm-design/icons';
import throttle from 'lodash/throttle';
import Events from '../utils/events';
import { ConfigContext } from '../config-provider';
import { getScrollParent, getScrollTop } from '../utils/dom';
import ActivityIndicator from '../activity-indicator';
import { useEventCallback } from '../utils/hooks';
import type { HTMLProps } from '../utils/utilityTypes';
import { REFRESH_STATE, LOAD_STATE, PullAction, BasePullProps } from './interface';

export interface PullCssVars {
  '--control-height'?: React.CSSProperties['height'];
  '--control-font-size'?: React.CSSProperties['fontSize'];
  '--control-padding-vertical'?: React.CSSProperties['padding'];
  '--control-text-color'?: React.CSSProperties['color'];
  '--control-icon-size'?: React.CSSProperties['fontSize'];
}

export interface PullProps extends BasePullProps, React.PropsWithChildren<HTMLProps<PullCssVars>> {}

const Pull = React.forwardRef<HTMLDivElement, PullProps>((props, ref) => {
  const pullRef = (ref as any) || React.createRef<HTMLDivElement>();
  const wrap = useRef<HTMLElement | Window>(window);

  const [isMounted, setIsMounted] = useState(false);
  const [offsetY, setOffsetY] = useState<number | 'auto'>(0);
  const [animationDuration, setAnimationDuration] = useState(0);
  const [refreshState, setRefreshState] = useState(props.refresh!.state);
  const [loadState, setLoadState] = useState(props.load!.state);
  const prevLoad = useRef<PullAction>({});
  const prevRefresh = useRef<PullAction>({});
  const { prefixCls, locale } = React.useContext(ConfigContext);
  const bem = createBEM('pull', { prefixCls });

  const onScroll = useEventCallback((): void => {
    // window为滚动容器时，无法通过 window 直接取到 scrollHeight 和 clientHeight。
    const {
      scrollHeight = document.body.clientHeight,
      clientHeight = document.documentElement.clientHeight,
    } = wrap.current as any;
    const load: PullAction = { ...Pull.defaultProps!.load, ...props!.load };
    const { handler, distance } = load;

    if (
      typeof handler !== 'function' ||
      refreshState !== REFRESH_STATE.normal ||
      loadState !== LOAD_STATE.normal ||
      scrollHeight <= clientHeight ||
      // 内容高度 - 偏移值 - 修正距离 <= 容器可见高度‚
      scrollHeight - getScrollTop(wrap.current as HTMLElement) - distance! > clientHeight
    ) {
      return;
    }
    handler();
  }, [props?.load?.handler]);

  const throttledScroll = throttle(onScroll, 250);

  const setScrollParent = (): void => {
    const _scrollContainer = getScrollParent(pullRef.current);

    // scrollContainer 未变更
    if (wrap.current === _scrollContainer) return;

    // 重新获取 scrollContainer
    wrap.current = _scrollContainer as HTMLElement | Window;
  };

  useEffect(() => {
    setScrollParent();
  });

  useEffect(() => {
    Events.on(wrap.current, 'scroll', throttledScroll);
    return () => {
      Events.off(wrap.current, 'scroll', throttledScroll);
    };
  }, [wrap.current]);

  /**
   * 执行动画
   * @param  {number} options.offsetY  偏移距离
   * @param  {number} options.animationDuration 动画执行时间
   */
  const doTransition = ({
    offsetY: iOffsetY,
    animationDuration: iAnimationDuration,
  }: {
    offsetY: number | 'auto';
    animationDuration: number;
  }): void => {
    setOffsetY(iOffsetY);
    setAnimationDuration(iAnimationDuration);
  };

  /**
   * 执行加载动作
   * @param  {LOAD_STATE} iLoadState 加载状态
   */
  const doLoadAction = (iLoadState: LOAD_STATE): void => {
    const { stayTime } = props;
    setLoadState(iLoadState);

    switch (iLoadState) {
      case LOAD_STATE.success:
        doLoadAction(LOAD_STATE.normal);
        break;

      case LOAD_STATE.failure:
        setTimeout(() => {
          if (!isMounted) return;
          doLoadAction(LOAD_STATE.abort);
        }, stayTime);
        break;

      default:
    }
  };

  /**
   * 执行刷新动作
   * @param  {REFRESH_STATE} iRefreshState 刷新状态
   * @param  {number}        iOffsetY      偏移距离
   */
  const doRefreshAction = (iRefreshState: REFRESH_STATE, iOffsetY?: number): void => {
    const { stayTime } = props;

    setRefreshState(iRefreshState);

    switch (iRefreshState) {
      case REFRESH_STATE.pull:
      case REFRESH_STATE.drop:
        doTransition({ offsetY: iOffsetY!, animationDuration: 0 });
        break;

      case REFRESH_STATE.loading:
        doTransition({ offsetY: 'auto', animationDuration });
        break;

      case REFRESH_STATE.success:
      case REFRESH_STATE.failure:
        doTransition({ offsetY: 'auto', animationDuration });
        setTimeout(() => {
          if (!isMounted) return;
          doRefreshAction(REFRESH_STATE.normal);
          doLoadAction(LOAD_STATE.normal);
        }, stayTime);
        break;

      default:
        doTransition({ offsetY: 0, animationDuration: props.animationDuration! });
    }
  };

  const onDragMove = (state): boolean => {
    const { movement, event } = state;
    const [, dragOffsetY] = movement;
    const { handler } = props.refresh!;

    if (
      // 未设置刷新事件
      !handler ||
      // 上拉
      dragOffsetY <= 0 ||
      // 未滚动到顶部
      (dragOffsetY > 0 && getScrollTop(wrap.current) > 0) ||
      // 已经触发过加载状态
      refreshState! >= REFRESH_STATE.loading
    ) {
      return false;
    }

    if (event.cancelable) {
      event.preventDefault();
    }

    const refresh: PullAction = { ...Pull.defaultProps?.refresh, ...props?.refresh };
    const { startDistance, distance } = refresh;

    // 设置拖动距离衰减（实际下拉移动距离为拖动距离的1/3）
    const offset = state.movement[1] / 3;

    // 判断是否达到释放立即刷新的条件
    const action = offset - startDistance! < distance! ? REFRESH_STATE.pull : REFRESH_STATE.drop;

    doRefreshAction(action, offset);
    return true;
  };

  const onDragEnd = ({ offsetY: iOffsetY }: { offsetY: number | 'auto' }): void => {
    // 没有产生位移
    if (!iOffsetY) {
      return;
    }

    // 当前状态为下拉状态时
    if (refreshState === REFRESH_STATE.pull) {
      doRefreshAction(REFRESH_STATE.normal);
      return;
    }

    // 执行外部触发刷新的回调
    const { handler } = props.refresh!;
    if (typeof handler === 'function') {
      handler();
    }
  };

  const bind = useDrag(
    (state) => {
      if (state.last) {
        setAnimationDuration(props!.animationDuration!);
        onDragEnd({ offsetY });
        return;
      }

      onDragMove(state);
    },
    {
      enabled: true,
      pointer: { touch: true },
      axis: 'y',
      eventOptions: { passive: !Events.supportsPassiveEvents },
    },
  );

  const { load, refresh } = props;
  if (prevLoad.current.state !== load!.state) {
    doLoadAction(load!.state as LOAD_STATE);
    prevLoad.current = load!;
  }
  if (prevRefresh.current.state !== refresh!.state) {
    doRefreshAction(refresh!.state as REFRESH_STATE);
    prevRefresh.current = refresh!;
  }

  useEffect(() => {
    setIsMounted(true);
    pullRef.current && Events.on(pullRef.current, 'touchmove', () => {});

    return () => {
      pullRef.current && Events.off(pullRef.current, 'touchmove', () => {});
      setIsMounted(false);
    };
  }, []);

  /**
   * 渲染刷新节点
   */
  const renderRefresh = (): ReactNode => {
    const refreshProps: PullAction = { ...Pull.defaultProps?.refresh, ...props?.refresh };
    const { startDistance, distance, render } = refreshProps;

    let percent = 0;
    if (typeof offsetY === 'number' && offsetY >= startDistance!) {
      percent =
        ((offsetY - startDistance! < distance! ? offsetY - startDistance! : distance)! * 100) /
        distance!;
    }

    if (typeof render === 'function') {
      return render(refreshState, percent);
    }

    const refreshCls = bem('control');

    switch (refreshState) {
      case REFRESH_STATE.pull:
        return (
          <div className={refreshCls}>
            <ActivityIndicator loading={false} percent={percent} />
            <span>{locale!.Pull!.pullText}</span>
          </div>
        );

      case REFRESH_STATE.drop:
        return (
          <div className={refreshCls}>
            <ActivityIndicator loading={false} percent={100} />
            <span>{locale!.Pull!.dropText}</span>
          </div>
        );

      case REFRESH_STATE.loading:
        return (
          <div className={refreshCls}>
            <ActivityIndicator type="spinner" />
            <span>{locale!.Pull!.loadingText}</span>
          </div>
        );

      case REFRESH_STATE.success:
        return (
          <div className={refreshCls}>
            <SuccessCircleIcon theme="success" />
            <span>{locale!.Pull!.successText}</span>
          </div>
        );

      case REFRESH_STATE.failure:
        return (
          <div className={refreshCls}>
            <WarningCircleIcon theme="danger" />
            <span>{locale!.Pull!.failureText}</span>
          </div>
        );

      default:
    }
  };

  /**
   * 渲染加载节点
   */
  const renderLoad = (): ReactNode => {
    const loadProps: PullAction = { ...Pull.defaultProps?.load, ...props?.load };
    const { render } = loadProps;

    if (typeof render === 'function') {
      return render(loadState);
    }

    const loadCls = bem('control');

    switch (loadState) {
      case LOAD_STATE.loading:
        return (
          <div className={loadCls}>
            <ActivityIndicator type="spinner" />
            <span>{locale!.Pull!.loadingText}</span>
          </div>
        );

      case LOAD_STATE.failure:
        return (
          <div className={loadCls}>
            <WarningCircleIcon theme="danger" />
            <span>{locale!.Pull!.failureText}</span>
          </div>
        );

      case LOAD_STATE.complete:
        return (
          <div className={loadCls}>
            <span>{locale!.Pull!.completeText}</span>
          </div>
        );

      default:
    }
  };

  const { className, style, children } = props;
  const cls = bem([className]);

  const loadCls = bem('load', [
    {
      show: loadState! >= LOAD_STATE.loading,
    },
  ]);

  const contentStyle: CSSProperties = {
    WebkitTransition: `all ${animationDuration}ms`,
    transition: `all ${animationDuration}ms`,
  };

  if (refreshState! <= REFRESH_STATE.drop) {
    contentStyle.WebkitTransform = `translate3d(0, ${offsetY}px, 0)`;
    contentStyle.transform = `translate3d(0, ${offsetY}px, 0)`;
  }

  return (
    <div className={cls} style={style} {...bind()}>
      <div className={bem('content')} ref={pullRef} style={contentStyle}>
        <div className={bem('refresh')}>{renderRefresh()}</div>
        <div className={bem('body')}>{children}</div>
        <div className={loadCls}>{renderLoad()}</div>
      </div>
    </div>
  );
});

Pull.defaultProps = {
  refresh: {
    state: REFRESH_STATE.normal,
    startDistance: 30,
    distance: 30,
  },
  load: {
    state: LOAD_STATE.normal,
    distance: 0,
  },
  animationDuration: 400,
  stayTime: 1000,
};

export default Pull;
