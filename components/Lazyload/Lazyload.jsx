import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Events from '../utils/events';

class Lazyload extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
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
    const left = this.rect.left - document.body.scrollLeft;
    const { onLoad } = this.props;

    if (top <= windowHeight) {
      typeof onLoad === 'function' && onLoad(() => {
        this.setState({
          loaded: true,
        });
      });
    }
  }

  render() {
    const { prefixCls, className, children, placeholder } = this.props;
    const { loaded } = this.state;

    const classes = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
    });

    return (
      <div className={classes} ref={(ref) => { this.lazyload = ref; }}>
        {
          loaded
            ? children
            : <div className="ui-lazyload-placeholder">{placeholder}</div>
        }
      </div>
    );
  }
}

Lazyload.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.element,
};

Lazyload.defaultProps = {
  prefixCls: 'ui-lazyload',
  className: null,
  placeholder: null,
};

export default Lazyload;
