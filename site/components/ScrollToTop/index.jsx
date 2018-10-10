import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
    Events.on(document, 'scroll', this.throttledScroll);
  }

  componentWillUnmount() {
    Events.off(document, 'scroll', this.throttledScroll);
  }

  onScroll = () => {
    this.setState({
      visible: document.documentElement.scrollTop > 300,
    });
  }

  getContainer() {
    if (!this.container) {
      const container = document.createElement('div');
      container.classList.add('scroll-to-top-container');
      this.container = container;
    }
    return this.container;
  }

  render() {
    const cls = classnames('scroll-to-top', {
      hide: !this.state.visible,
    });

    return ReactDOM.createPortal(
      <div className={cls} onClick={() => {
        alert(1);
      }}>
        <Icon type="arrow-top" />
      </div>,
      this.getContainer()
    );
  }
}

export default ScrollToTop;
