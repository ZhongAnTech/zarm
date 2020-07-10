
import { PureComponent } from 'react';
import Events from '../utils/events';
import Throttle from '../utils/throttle';
import { ContainerType } from '../utils/dom';
import { getScrollContainer, getScrollTop } from './ScrollContainer';

export interface ScrollerProps {
  prefixCls?: string;
  container?: ContainerType;
  onScroll?: (scrollTop?: number) => void;
}

export default class Scroller extends PureComponent<ScrollerProps, {}> {
  static displayName = 'Scroller';

  static defaultProps: Partial<ScrollerProps> = {
    prefixCls: 'za-scroller',
    container: window,
  };

  private mounted: boolean;

  scrollContainer: HTMLElement | Window;

  scrollTop: number;

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

  onScroll = (): void => {
    const { onScroll, container } = this.props;
    if (!this.mounted) return;
    this.scrollTop = getScrollTop(container);
    typeof onScroll === 'function' && Throttle(onScroll!(this.scrollTop), 250);
  };

  bindEvent = (): void => {
    const { container } = this.props;
    this.scrollContainer = getScrollContainer(container);
    this.scrollTop = getScrollTop(container);
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
