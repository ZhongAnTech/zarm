import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Lazyload from '../Lazyload';

class Img extends PureComponent {

  constructor(props) {
    super(props);
    this._onLoad = this._onLoad.bind(this);
  }

  _onLoad(cb) {
    const img = new Image();
    img.src = this.props.src;
    img.onload = cb;
    img.onerror = () => {};
  }

  render() {
    const { prefixCls, src, alt, lazyload, isLazyload, placeholder, className, ...others } = this.props;

    const classes = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
    });

    return (
      <Lazyload onLoad={this._onLoad}>
        <img src={src} alt={alt} className={classes} {...others} />
      </Lazyload>
    );
  }
}

Img.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  isLazyload: PropTypes.bool,
  placeholder: PropTypes.element,
};

Img.defaultProps = {
  prefixCls: 'ui-img',
  className: null,
  isLazyload: false,
  placeholder: null,
};

export default Img;
