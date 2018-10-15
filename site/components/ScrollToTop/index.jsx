import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Icon } from 'dragon-ui';
import Events from '@site/utils/events';
import Throttle from '@site/utils/throttle';
import './style.scss';

class ScrollToTop extends Component {
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
  }

  getScrollTop = () => document.documentElement.scrollTop || document.body.scrollTop;

  getContainer() {
    if (!this.container) {
      const container = document.createElement('div');
      container.classList.add('scroll-to-top-container');
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
  }

  render() {
    const cls = classnames('scroll-to-top', {
      hide: !this.state.visible,
    });

    return ReactDOM.createPortal(
      <div
        className={cls}
        onClick={this.scrollToTop}
      >
        <Icon type="arrow-top" />
      </div>,
      this.getContainer()
    );
  }
}

ScrollToTop.propTypes = {
  // 滚动速度
  speed: PropTypes.number,
  // 离滚动条顶部的可视距离
  visibleDistance: PropTypes.number,
};

ScrollToTop.defaultProps = {
  // 每10毫秒滑动的距离
  speed: 120,
  // 距离滚动条顶部300像素才出现按钮
  visibleDistance: 300,
};

export default ScrollToTop;
