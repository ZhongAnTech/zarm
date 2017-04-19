import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';

let imgs = [];

function _addImg(img) {
  imgs.push(img);
}

function _offset(ele) {
  let top = 0;
  let left = 0;
  do {
    top += ele.offsetTop || 0;
    left += ele.offsetLeft || 0;
    ele = ele.offsetParent;
  } while (ele);

  return {
    top,
    left,
  };
}

function _loadImg() {
  if (!imgs.length) {
    return null;
  }

  const { scrollTop = 0 } = document.body;
  const clientHeight = window.screen.availHeight;

  imgs = imgs.filter((img) => {
    const ele = findDOMNode(img);
    const top = _offset(ele).top;

    if (top <= scrollTop + clientHeight) {
      img.loadImg();
      return false;
    }

    return true;
  });
}

document.addEventListener('scroll', _loadImg);

class Picture extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    if (!this.props.async) {
      return;
    }

    _addImg(this);
    _loadImg();
  }

  loadImg() {
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
    const { src = '', className, children, width, height, async, img, ...others } = this.props;
    const { href = '' } = others;
    const { loaded } = this.state;

    const Ele = href ? 'a' : 'div';

    const eleCls = classnames({
      'loading-img': true,
      'loaded': loaded || !async,
      [className]: !!className,
    });

    const imgCls = classnames({
      'img-ele': true,
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

Picture.propTypes = {
  img: PropTypes.bool, // 是否使用Img标签
  async: PropTypes.bool, // 是否懒加载
};

Picture.defaultProps = {
  img: false,
  async: true,
};

export default Picture;
