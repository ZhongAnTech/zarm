
import React, { PureComponent, MouseEvent, CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import classnames from 'classnames';
import Events from '../utils/events';
import Throttle from '../utils/throttle';

type getContainerFunc = () => HTMLElement;

export interface BackToTopProps {
  prefixCls?: string;
  className?: string;
  speed?: number;
  visibleDistance?: number;
  scrollContainer?: HTMLElement | getContainerFunc;
  onClick: (event?: MouseEvent<HTMLDivElement>) => void;
}

export interface BackToTopStates {
  visible: boolean;
}

export default class BackToTop extends PureComponent<BackToTopProps, BackToTopStates> {
  static displayName = 'BackToTop';

  static defaultProps = {
    prefixCls: 'za-back-to-top',
    speed: 100,
    visibleDistance: 400,
    scrollContainer: window,
  };

  readonly state: BackToTopStates = {
    visible: false,
  };

  private container: HTMLDivElement;

  private timer: number;

  componentDidMount() {
    this.bindEvent();
  }

  componentDidUpdate(prevProps: BackToTopProps) {
    const { scrollContainer } = this.props;
    if (prevProps.scrollContainer !== scrollContainer) {
      this.bindEvent();
    }
  }

  componentWillUnmount() {
    this.unBindEvent();
  }

  onScroll = () => {
    Throttle(() => {
      this.setState({
        visible: this.getScrollTop > this.props.visibleDistance!,
      });
    }, 250);
  };

  get getParentElement(): Element {
    if (typeof this.getScrollContainer === 'object' && this.getScrollContainer instanceof Window) {
      return document.body;
    }
    return this.getScrollContainer;
  }

  get getScrollContainer(): HTMLElement | Window {
    const { scrollContainer } = this.props;
    if (scrollContainer) {
      if (typeof scrollContainer === 'function') {
        return scrollContainer();
      }
      if (typeof scrollContainer === 'object' && scrollContainer instanceof HTMLElement) {
        return scrollContainer;
      }
    }
    return window;
  }

  get getScrollTop(): number {
    return this.getScrollContainer !== window
      ? (this.getScrollContainer as HTMLElement).scrollTop
      : document.documentElement.scrollTop + document.body.scrollTop;
  }

  get getContainer(): HTMLElement {
    const { prefixCls, className } = this.props;
    if (!this.container) {
      const container = document.createElement('div');
      container.className = classnames(`${prefixCls}-container`, className);
      this.container = container;
    }
    return this.container;
  }

  scrollToTop = (e: MouseEvent<HTMLDivElement>) => {
    const { speed, onClick } = this.props;

    if (typeof onClick === 'function') {
      onClick(e);
    }

    // 速度设置为0或者无穷大时，直接到顶
    if (speed === 0 || speed === Infinity) {
      this.getScrollContainer.scrollTo(0, 0);
      return;
    }

    this.timer = setInterval(() => {
      let st = this.getScrollTop;
      st -= speed!;
      if (st > 0) {
        this.getScrollContainer.scrollTo(0, st);
      } else {
        this.getScrollContainer.scrollTo(0, 0);
        clearInterval(this.timer);
      }
    }, 10);
  };

  bindEvent() {
    if (this.getScrollContainer) {
      this.getParentElement instanceof HTMLElement && this.getParentElement.appendChild(this.container);
      Events.on(this.getScrollContainer, 'scroll', this.onScroll);
    }
  }

  unBindEvent() {
    clearInterval(this.timer);
    if (this.getScrollContainer) {
      this.getParentElement instanceof HTMLElement && this.getParentElement.removeChild(this.container);
      Events.off(this.getScrollContainer, 'scroll', this.onScroll);
    }
  }

  render() {
    const { prefixCls, children } = this.props;
    const { visible } = this.state;
    const style: CSSProperties = {};

    if (!visible) {
      style.display = 'none';
    }

    return createPortal(
      <div className={prefixCls} style={style} onClick={this.scrollToTop}>
        {children}
      </div>,
      this.getContainer,
    );
  }
}
