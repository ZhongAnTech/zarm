import React, { PropTypes } from 'react';
import classnames from 'classnames';

import Lazy from '../Lazy';

class Img extends Lazy {
  markToRender() {
    const img = new Image();
    img.src = this.props.src;

    img.onload = () => {
      this.setState({
        loaded: true,
      });
    };

    img.onerror = () => {
      this.setState({
        loaded: true,
      });
    };
  }

  render() {
    const { src = '', className, children, width, height, img, isLazy, ...others } = this.props;
    const { href = '' } = others;
    const { loaded } = this.state;

    const Ele = href ? 'a' : 'div';

    const eleCls = classnames({
      'ui-loading-img': true,
      'loaded': loaded || !('lazy' in this.props || isLazy),
      [className]: !!className,
    });

    const imgCls = classnames({
      'ui-img-ele': true,
      'show': !!img,
    });

    const style = {};
    !img && (style.backgroundImage = `url(${src})`);
    width && (style.width = `${width}px`);
    height && (style.height = `${height}px`);

    return (
      <Ele className={eleCls} style={style}>
        {loaded ? <img className={imgCls} src={src} width={width} height={height} {...others} /> : null}
        {children}
      </Ele>
    );
  }
}

Img.propTypes = {
  img: PropTypes.bool, // 是否使用Img标签
  src: PropTypes.string, // 图片链接
  lazy: PropTypes.bool, // 是否懒加载
  isLazy: PropTypes.bool, // 是否懒加载
};

Img.defaultProps = {
  img: false,
  src: '',
  isLazy: true, // 是否懒加载
};

export default Img;
