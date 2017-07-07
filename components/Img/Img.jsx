import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Lazyload from '../Lazyload';

class Img extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
    this._onLoad = this._onLoad.bind(this);
  }

  _onLoad() {
    const img = new Image();
    img.src = this.props.src;
    img.onload = () => {
      this.setState({
        loaded: true,
      });
    };
    img.onerror = () => {};
  }

  render() {
    const { prefixCls, src, alt, className, style, ...others } = this.props;
    const { loaded } = this.state;

    return (
      <Lazyload className={className} onLoad={this._onLoad}>
        {
          loaded ? <div className={`${prefixCls}`} style={{ ...style, backgroundImage: `url(${src})` }} {...others} /> : null
          // loaded ? <img className={`${prefixCls}`} src={src} alt={alt} {...others} /> : null
        }
      </Lazyload>
    );
  }
}

Img.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
};

Img.defaultProps = {
  prefixCls: 'ui-img',
  className: null,
};

export default Img;
