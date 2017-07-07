import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Events from '../utils/events';

class Lazyload extends PureComponent {

  constructor(props) {
    super(props);
    this.scrollHandler = this.scrollHandler.bind(this);
  }

  componentDidMount() {
    this.rect = this.lazyload.getBoundingClientRect();
    this.scrollHandler();
    Events.on(window, 'scroll', this.scrollHandler);
  }

  componentWillUnmount() {
    Events.off(window, 'scroll', this.scrollHandler);
  }

  scrollHandler() {
    // const parent = this.lazyload.parentNode;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    const top = this.rect.top - document.body.scrollTop;
    const bottom = this.rect.bottom - document.body.scrollTop;
    const left = this.rect.left - document.body.scrollLeft;
    const { onLoad } = this.props;

    // console.log(this.rect.top, this.rect.bottom, document.body.scrollTop, windowHeight);

    if (
      (top <= windowHeight)
      // || (bottom > 0 && bottom <= windowHeight)
    ) {
      typeof onLoad === 'function' && onLoad();
    }
  }

  render() {
    const { prefixCls, className, children } = this.props;

    const classes = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
    });

    return (
      <div className={classes} ref={(ref) => { this.lazyload = ref; }}>
        {children}
      </div>
    );
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
