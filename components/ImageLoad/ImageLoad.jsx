import React, { Component } from 'react';
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

class ImageLoad extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
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
    const { src = '', className, children, ...others } = this.props;
    const { href = '' } = others;

    const cls = classnames({
      'loading-img': true,
      'loaded': this.state.loaded,
      [className]: !!className,
    });

    const Ele = href ? 'a' : 'div';

    return (
      <Ele className={cls} style={{ backgroundImage: `url(${src})` }} {...others}>
        {children}
      </Ele>
    );
  }
}

export default ImageLoad;
