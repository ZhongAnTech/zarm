import { PureComponent } from 'react';
import Events from '../utils/events';
import Throttle from '../utils/throttle';
import { canUseDOM, ContainerType, getScrollContainer, getScrollTop } from '../utils/dom';

export interface ScrollerProps {
  prefixCls?: string;
  container?: ContainerType;
  onScroll?: (scrollTop?: number) => void;
}

export default class Scroller extends PureComponent<ScrollerProps, {}> {
  static displayName = 'Scroller';

  static defaultProps: Partial<ScrollerProps> = {
    prefixCls: 'za-scroller',
    container: canUseDOM ? window : undefined,
  };

  private mounted: boolean;

  componentDidMount() {
    this.bindEvent();
    this.mounted = true;
  }

  componentDidUpdate(prevProps: ScrollerProps) {
    const { container } = this.props;
    if (prevProps.container !== container) {
      this.bindEvent();
    }
  }

  componentWillUnmount() {
    this.unBindEvent();
    this.mounted = false;
  }

  get scrollContainer(): HTMLElement | Window {
    const { container } = this.props;
    return getScrollContainer(container);
  }

  get scrollTop(): number {
    return getScrollTop(this.scrollContainer);
  }

  onScroll = (): void => {
    const { onScroll } = this.props;
    if (!this.mounted) return;
    typeof onScroll === 'function' && Throttle(onScroll!(this.scrollTop), 250);
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
