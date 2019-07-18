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

  private isTouch: boolean;

  private container: HTMLElement;

  constructor(props) {
    super(props);

    this.isTouch = false;
  }

  componentDidMount() {
    const { disabled } = this.props;

    if (!disabled) {
      Events.on(document, 'click', this.handle);
      Events.on(document, 'touchend', this.handle);
    }
  }

  componentWillUnmount() {
    const { disabled } = this.props;

    if (!disabled) {
      Events.off(document, 'click', this.handle);
      Events.off(document, 'touchend', this.handle);
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

    const { onClickOutside } = this.props;
    const el = this.container;

    if (el && !el.contains(event.target)) onClickOutside(event);
  };

  render() {
    const { onClickOutside, disabled, children, ...rest } = this.props;

    return <div ref={this.getContainer} {...rest}>{children}</div>;
  }
}
