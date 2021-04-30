import React from 'react';
import type ClickOutsideProps from './PropsType';
import Events from '../utils/events';

export default class ClickOutside extends React.Component<ClickOutsideProps> {
  static defaultProps: ClickOutsideProps = {
    disabled: false,
  };

  private isTouch = false;

  private container: HTMLElement | null = null;

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

  mountContainer = (node: HTMLDivElement | null) => {
    this.container = node;
  };

  handle = (event: MouseEvent | TouchEvent) => {
    if (event.type === 'touchend') {
      this.isTouch = true;
    }

    if (event.type === 'click' && this.isTouch) return;

    const { onClickOutside, ignoredNode } = this.props;
    if (!onClickOutside) return;
    const el = this.container;

    if (ignoredNode && ignoredNode.contains(event.target as Node)) return;
    if (el && !el.contains(event.target as Node)) onClickOutside(event);
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

    return (
      <div ref={this.mountContainer} {...rest}>
        {children}
      </div>
    );
  }
}
