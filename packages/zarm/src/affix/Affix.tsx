import React, { PureComponent, createRef } from 'react';
import classnames from 'classnames';
import { AffixProps as BaseAffixProps } from './PropsType';
import Events from '../utils/events';
import { canUseDOM } from '../utils/dom';
import throttle from '../utils/throttle';

export interface AffixStates {
  affixed: boolean;
  // used to record origin dom rect
  width: number;
  height: number;
}

export interface AffixProps extends BaseAffixProps {
  prefixCls?: string;
  className?: string;
}

const DEFAULT_SCROLL_CONTAINER = canUseDOM ? window : undefined;

export default class Affix extends PureComponent<AffixProps, AffixStates> {
  static displayName = 'Affix';

  static defaultProps: AffixProps = {
    prefixCls: 'za-affix',
    scrollContainer: DEFAULT_SCROLL_CONTAINER,
    offsetTop: 0,
  };

  private savePlaceholderNode = createRef<HTMLDivElement>();

  private saveFixedNode = createRef<HTMLDivElement>();

  private saveFixedNodeTop = 'offsetBottom' in this.props ? -10000 : 10000;

  state = {
    affixed: false,
    width: 0,
    height: 0,
  };

  componentDidMount() {
    // wait for ref not null
    const { offsetBottom } = this.props;
    const { container, onPositionUpdate } = this;

    container &&
      setTimeout(() => {
        Events.on(container, 'scroll', onPositionUpdate);

        if (typeof offsetBottom !== 'undefined') {
          this.onPositionUpdate();
        }
      });
  }

  componentWillUnmount() {
    const { container, onPositionUpdate } = this;
    container &&
      setTimeout(() => {
        Events.off(container, 'scroll', onPositionUpdate);
      });
  }

  onPositionUpdate = throttle(() => {
    const { onChange } = this.props;
    const { affixed } = this.state;
    const target = this.savePlaceholderNode.current!;
    if (!target) {
      return false;
    }
    const { top, width, height } = target?.getBoundingClientRect();

    this.saveFixedNodeTop = top;

    const currentAffixed = this.affixed;
    if (currentAffixed !== affixed) {
      this.setState({
        affixed: currentAffixed,
        // use 'auto' when get width or height is 0
        width: width === 0 ? ('auto' as any) : width,
        height: height === 0 ? ('auto' as any) : height,
      });
      onChange && onChange(currentAffixed);
    }
  }, 10);

  get container() {
    if (!canUseDOM) return DEFAULT_SCROLL_CONTAINER;
    const { scrollContainer } = this.props;
    const container = typeof scrollContainer === 'function' ? scrollContainer!() : scrollContainer;

    return !container ? window : container;
  }

  get containerRect(): DOMRect {
    const { container } = this;

    if (!canUseDOM) {
      return { top: 0, bottom: 0 } as any;
    }

    return container !== window
      ? (container as HTMLElement).getBoundingClientRect()
      : ({ top: 0, bottom: container.innerHeight, width: 0, height: 0 } as any);
  }

  get affixed() {
    const { containerRect, saveFixedNodeTop } = this;
    const { offsetTop, offsetBottom } = this.props;

    if (
      typeof offsetBottom !== 'undefined' &&
      saveFixedNodeTop + offsetBottom >= containerRect.bottom
    ) {
      return true;
    }

    if (
      typeof offsetBottom === 'undefined' &&
      typeof offsetTop !== 'undefined' &&
      saveFixedNodeTop - offsetTop <= containerRect.top
    ) {
      return true;
    }

    return false;
  }

  get affixStyle(): React.CSSProperties {
    const { containerRect } = this;
    const { offsetTop, offsetBottom } = this.props;
    const { width, height } = this.state;

    if (this.affixed && typeof offsetBottom !== 'undefined') {
      return {
        position: 'fixed',
        bottom: offsetBottom,
        width,
        height,
      };
    }

    if (this.affixed && typeof offsetTop !== 'undefined') {
      return {
        position: 'fixed',
        top: containerRect.top + offsetTop,
        width,
        height,
      };
    }

    return {};
  }

  render() {
    const { prefixCls, className, children } = this.props;

    const cls = classnames(prefixCls, className);

    return (
      <div ref={this.savePlaceholderNode}>
        <div className={cls} ref={this.saveFixedNode} style={this.affixed ? this.affixStyle : {}}>
          {children}
        </div>
      </div>
    );
  }
}
