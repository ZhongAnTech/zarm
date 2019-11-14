import React from 'react';
import PropTypes from 'prop-types';

import ClickOutsideProps from './PropsType';
import Events from '../utils/events';

export default class ClickOutside extends React.Component<ClickOutsideProps> {
  static propTypes = {
    onClickOutside: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
  };

  private isTouch = false;

  private container: HTMLElement;

  componentDidMount() {
    const { disabled } = this.props;

    if (!disabled) {
      this.bindEvent();
    }
  }

  componentDidUpdate(prevProps: ClickOutsideProps) {
    const { disabled } = this.props;

    if (prevProps.disabled !== disabled) {
      if (disabled) {
        this.unBindEvent();
      } else {
        this.bindEvent();
      }
    }
  }

  componentWillUnmount() {
    const { disabled } = this.props;

    if (!disabled) {
      this.unBindEvent();
    }
  }

  getContainer = (node) => {
    this.container = node;
  };

  handle = (event) => {
    if (event.type === 'touchend') {
      this.isTouch = true;
    }

    if (event.type === 'click' && this.isTouch) return;

    const { onClickOutside, ignoredNode } = this.props;
    const el = this.container;

    if (ignoredNode && ignoredNode.contains(event.target)) return;
    if (el && !el.contains(event.target)) onClickOutside(event);
  };

  bindEvent() {
    Events.on(document, 'click', this.handle);
    Events.on(document, 'touchend', this.handle);
  }

  unBindEvent() {
    Events.off(document, 'click', this.handle);
    Events.off(document, 'touchend', this.handle);
  }

  render() {
    const { onClickOutside, disabled, children, ignoredNode, ...rest } = this.props;

    return <div ref={this.getContainer} {...rest}>{children}</div>;
  }
}
