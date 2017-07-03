import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Lazyload from '../Lazyload';

class Img extends PureComponent {

  render() {
    const { prefixCls, src, alt, width, height, ...others } = this.props;

    const style = {
      width,
      height,
    };

    return (
      <Lazyload style={style}>
        <img src={src} alt={alt} style={style} {...others} />
      </Lazyload>
    );
  }
}

// Img.propTypes = {
//   prefixCls: PropTypes.string,
//   className: PropTypes.string,
// };

Img.defaultProps = {
  prefixCls: 'ui-img',
  className: null,
};

export default Img;
