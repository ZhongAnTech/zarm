import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Lazyload from '../Lazyload';

class Img extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.imgLoad = this.imgLoad.bind(this);
  }

  imgLoad() {
    const img = new Image();
    img.src = this.props.src;
    img.onload = () => {
      this.setState({ visible: true });
    };
  }

  render() {
    const { prefixCls, src, alt, isLazyload, ...others } = this.props;
    const { visible } = this.state;

    const _src = ((isLazyload && visible) || !isLazyload)
      ? src
      : 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

    const imgRender = <img src={_src} alt={alt} {...others} />;

    return isLazyload
      ? <Lazyload onLoad={this.imgLoad}>{imgRender}</Lazyload>
      : imgRender;
  }
}

Img.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  isLazyload: PropTypes.bool,
};

Img.defaultProps = {
  prefixCls: 'ui-img',
  className: null,
  isLazyload: true,
};

export default Img;
