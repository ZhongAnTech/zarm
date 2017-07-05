import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
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
      this.setState({
        visible: true,
        width: img.width,
        height: img.height,
      });
    };
    img.onerror = () => {
      console.log('image load error');
    };
  }

  render() {
    const props = this.props;
    const { prefixCls, src, alt, lazyload, isLazyload, placeholder, className, style, ...others } = this.props;
    const { visible } = this.state;
    const lazy = 'lazyload' in props || isLazyload;

    const classes = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
    });

    const styles = { ...style };
    if (visible) {
      styles.backgroundImage = `url(${src})`;
    }

    const imgRender = <div className={classes} style={styles} {...others}>{ !visible && placeholder }</div>;

    return lazy
      ? <Lazyload onLoad={this.imgLoad}>{imgRender}</Lazyload>
      : imgRender;
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
