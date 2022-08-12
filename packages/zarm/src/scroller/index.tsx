import { PureComponent } from 'react';
import throttle from 'lodash/throttle';
import Events from '../utils/events';
import { canUseDOM, getScrollContainer, getScrollTop } from '../utils/dom';
import type { ScrollContainer } from '../utils/dom';

export interface ScrollerProps {
  prefixCls?: string;
  scrollContainer?: ScrollContainer;
  onScroll?: (scrollTop?: number) => void;
}

export default class Scroller extends PureComponent<ScrollerProps, {}> {
  static displayName = 'Scroller';

  static defaultProps: Partial<ScrollerProps> = {
    prefixCls: 'za-scroller',
    scrollContainer: canUseDOM ? window : undefined,
  };

  private mounted: boolean;

  private scrollThrottled = this.props.onScroll ? throttle(this.props.onScroll, 250) : () => {};

  componentDidMount() {
    this.bindEvent();
    this.mounted = true;
  }

  componentDidUpdate(prevProps: ScrollerProps) {
    const { scrollContainer } = this.props;
    if (prevProps.scrollContainer !== scrollContainer) {
      this.bindEvent();
    }
  }

  componentWillUnmount() {
    this.unBindEvent();
    this.mounted = false;
  }

  get scrollContainer(): HTMLElement | Window {
    const { scrollContainer } = this.props;
    return getScrollContainer(scrollContainer);
  }

  get scrollTop(): number {
    return getScrollTop(this.scrollContainer);
  }

  onScroll = (): void => {
    const { onScroll } = this.props;
    if (!this.mounted) return;
    typeof onScroll === 'function' && this.scrollThrottled(this.scrollTop);
  };

  bindEvent = (): void => {
    this.scrollContainer && Events.on(this.scrollContainer, 'scroll', this.onScroll);
  };

  unBindEvent = (): void => {
    this.scrollContainer && Events.off(this.scrollContainer, 'scroll', this.onScroll);
  };

  render() {
    const { children } = this.props;
    return children || null;
  }
}
