import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Events from '@site/utils/events';
import Throttle from '@site/utils/throttle';

class ScrollToTop extends PureComponent {
  static propTypes = {
    // 类名前缀
    prefixCls: PropTypes.string,
    // 每10毫秒滑动的距离
    speed: PropTypes.number,
    // 离滚动条顶部的可视距离
    visibleDistance: PropTypes.number,
  };

  static defaultProps = {
    prefixCls: 'za-scroll-to-top',
    speed: 120,
    visibleDistance: 300,
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.throttledScroll = Throttle(this.onScroll, 250);
  }

  componentDidMount() {
    document.body.appendChild(this.container);
    Events.on(window, 'scroll', this.throttledScroll);
  }

  componentWillUnmount() {
    Events.off(window, 'scroll', this.throttledScroll);
  }

  onScroll = () => {
    this.setState({
      visible: this.getScrollTop() > this.props.visibleDistance,
    });
  };

  getScrollTop = () => document.documentElement.scrollTop || document.body.scrollTop;

  getContainer() {
    const { prefixCls } = this.props;
    if (!this.container) {
      const container = document.createElement('div');
      container.className += ` ${prefixCls}-container`;
      this.container = container;
    }
    return this.container;
  }

  scrollToTop = () => {
    const timer = setInterval(() => {
      let st = this.getScrollTop();
      st -= this.props.speed;
      if (st > 0) {
        window.scrollTo(0, st);
      } else {
        window.scrollTo(0, 0);
        clearInterval(timer);
      }
    }, 10);
  };

  render() {
    const { prefixCls, children } = this.props;
    const { visible } = this.state;
    const style = {};

    if (!visible) {
      style.display = 'none';
    }

    return createPortal(
      <div className={prefixCls} style={style} onClick={this.scrollToTop}>
        {children}
      </div>,
      this.getContainer(),
    );
  }
}

export default ScrollToTop;
