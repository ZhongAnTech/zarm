import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import { addStack, removeStack, isLazyLoad } from '../utils/lazyload';

class Lazy extends Component {
  constructor(props) {
    super(props);

    this._lazyId = '';
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    if (!isLazyLoad(this.props)) {
      return null;
    }

    this._lazyId = addStack(this);
  }

  componentWillUnmount() {
    removeStack(this._lazyId);
  }

  markToRender() {
    this.setState({
      loaded: true,
    });
  }

  render() {
    const { className, placeholder, children } = this.props;
    const { loaded } = this.state;

    const cls = classnames({
      'ui-lazy': true,
      'loaded': loaded || !isLazyLoad(this.props),
      [className]: !!className,
    });

    return (
      <span className={cls}>
        { loaded ? children : placeholder }
      </span>
    );
  }
}

const defaultPlaceholder = (
  <span className="ui-lazy-placeholder">加载中...</span>
);

Lazy.propTypes = {
  placeholder: PropTypes.element.isRequired,
  lazy: PropTypes.bool, // 是否懒加载
  isLazy: PropTypes.bool, // 是否懒加载
};

Lazy.defaultProps = {
	placeholder: defaultPlaceholder,
  lazy: true,
  isLazy: true, // 是否懒加载
};

export default Lazy;
