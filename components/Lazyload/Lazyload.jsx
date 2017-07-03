import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Events from '../utils/events';

const winHeight = window.innerHeight || document.documentElement.clientTop || 0;

class Lazyload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    // const parent = this.lazyload.parentNode;
    this.rect = this.lazyload.getBoundingClientRect();

    if (this.rect.top < winHeight) {
      this.setState({
        loaded: true,
      });
    }

    Events.on(window, 'scroll', () => this.scrollHandler());
  }

  componentWillUnmount() {
    Events.off(window, 'scroll', () => this.scrollHandler());
  }

  scrollHandler() {
    const top = this.rect.top - document.body.scrollTop;
    const bottom = this.rect.bottom - document.body.scrollTop;

    if (top < winHeight) {
      // this.props.onLoad();
      this.setState({
        loaded: true,
      });
    }
  }

  render() {
    const { prefixCls, className, children, ...others } = this.props;
    const { loaded } = this.state;

    const classes = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
    });

    return loaded
      ? children
      : <div ref={(ref) => { this.lazyload = ref; }} className={classes} {...others} />;
  }
}

Lazyload.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
};

Lazyload.defaultProps = {
  prefixCls: 'ui-lazyload',
  className: null,
};

export default Lazyload;
