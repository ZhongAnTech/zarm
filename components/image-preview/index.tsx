import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import PropsType, { Iimage } from './PropsType';
import Popup from '../popup';
import Carousel from '../carousel';
import PinchZoom from '../pinch-zoom';
import ActivityIndicator from '../activity-indicator';
import { isObject, isString } from '../utils/validate';
import LocaleReceiver from '../locale-receiver';
import { Locale } from '../locale-provider/PropsType';

export interface ImagePreviewProps extends PropsType {
  prefixCls?: string;
  className?: string;
  locale?: Locale['ImagePreview'];
}

export interface Point {
  x: number;
  y: number;
}

enum LoadStatus {
  before = 'loadBefore',
  start = 'loadStart',
  end = 'loadEnd',
  after = 'loadAfter',
}

type Images = Array<Partial<Iimage> & { loaded?: LoadStatus }>;

const formatImages = (images: Array<Iimage> | Array<string>): Images => {
  const previewImages: Images = [];
  images.forEach((image) => {
    if (isString(image)) {
      previewImages.push({
        url: image,
      });
    } else if (isObject(image)) {
      previewImages.push({
        url: image.url,
        originUrl: image.originUrl,
        loaded: LoadStatus.before,
      });
    }
  });
  return previewImages;
};

class ImagePreview extends Component<ImagePreviewProps, any> {
  static defaultProps = {
    prefixCls: 'za-image-preview',
    activeIndex: 0,
  };

  doubleClickTimer;

  touchStartTime: number;

  moving: boolean;

  pinchData: {
    scale?: number;
    x?: number;
    y?: number;
  } = {};

  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      images: formatImages(props.images),
      swipeable: false,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (
      ('visible' in nextProps && nextProps.visible !== state.prevVisible)
      || ('activeIndex' in nextProps && nextProps.activeIndex !== state.prevActiveIndex)
    ) {
      return {
        visible: nextProps.visible,
        activeIndex: nextProps.activeIndex,
        images: formatImages(nextProps.images),
        prevVisible: nextProps.visible,
        prevActiveIndex: nextProps.activeIndex,
      };
    }
    return null;
  }

  shouldComponentUpdate(_nextProps, nextState) {
    const { images } = this.state;
    return isEqual(images, nextState.images);
  }

  onChange = (index) => {
    const { onChange } = this.props;
    this.setState({
      currentIndex: index,
    }, () => {
      if (typeof onChange === 'function') {
        onChange(index);
      }
    });
    this.moving = true;
  };

  close = () => {
    if (this.moving) {
      return false;
    }
    const { onClose } = this.props;
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  loadOrigin = () => {
    const { currentIndex = 0, images } = this.state;
    const { originUrl, loaded } = images[currentIndex];
    if (loaded !== LoadStatus.before) {
      return;
    }
    images[currentIndex].loaded = LoadStatus.start;
    this.setState({
      images,
    });

    const img = new Image();
    img.onload = () => {
      images[currentIndex].loaded = LoadStatus.end;
      images[currentIndex].url = originUrl;
      this.setState({
        images,
      });
      setTimeout(() => {
        images[currentIndex].loaded = LoadStatus.after;
        this.setState({
          images,
        });
      }, 1500);
    };
    img.src = originUrl;
  };

  showOriginButton = (images: Images, activeIndex): boolean => {
    if (
      images
      && images[activeIndex]
      && images[activeIndex].originUrl
      // && !images[activeIndex].loaded
    ) {
      return true;
    }
    return false;
  };

  onWrapperTouchStart = (e) => {
    this.touchStartTime = Date.now();
    this.moving = false;
  };

  onWrapperTouchEnd = (e) => {
    const deltaTime = Date.now() - this.touchStartTime;
    const { onClose } = this.props;
    // prevent long tap to close component
    if (deltaTime < 300) {
      if (!this.doubleClickTimer && !this.moving) {
        this.doubleClickTimer = setTimeout(() => {
          this.doubleClickTimer = null;
          if (typeof onClose === 'function') {
            onClose();
          }
        }, 300);
      } else {
        clearTimeout(this.doubleClickTimer);
        this.doubleClickTimer = null;
      }
    }
    const { scale, x, y } = this.pinchData;
    if (scale === 1 && x === 0 && y === 0) {
      this.setState({
        swipeable: true,
      });
    }
  };

  onWrapperMouseUp = () => {
    if (!('ontouchend' in document)) {
      setTimeout(() => {
        this.moving = false;
      }, 200);
    }
  };

  onWrapperTouchMove = (e) => {
    const { scale = 1, x = 0, y = 0 } = this.pinchData;
    if (scale !== 1 || x !== 0 || y !== 0) {
      this.setState({
        swipeable: false,
      });
    } else {
      this.setState({
        swipeable: true,
      });
    }
    this.moving = true;
  };

  onWrapperMouseDown = () => {
    if (!('ontouchend' in document)) {
      this.moving = false;
    }
  };

  pinchChange = ({ scale, x, y }) => {
    // console.log(scale, x, y)
    // let flag = false;
    // const { swipeable } = this.state;
    // if (scale === 1 || x === 0 || y === 0) {
    //   flag = true;
    // }
    // if (swipeable === flag) return false;
    // this.setState({
    //   swipeable: flag,
    // });
    this.pinchData = {
      scale,
      x,
      y,
    };
  };

  renderImages = () => {
    const { prefixCls, minScale, maxScale } = this.props;
    const { images } = this.state;
    return images.map((item, i) => {
      return (
        <div className={`${prefixCls}__item`} key={+i}>
          <PinchZoom
            className={`${prefixCls}__item__img`}
            onChange={this.pinchChange}
            minScale={minScale}
            maxScale={maxScale}
          >
            <img src={item.url} alt="" draggable={false} />
          </PinchZoom>
        </div>
      );
    });
  };

  render() {
    const { prefixCls, title, locale, activeIndex } = this.props;
    const { currentIndex = 0, visible, images, swipeable } = this.state;
    const { loaded } = images[currentIndex];

    return (
      <Popup direction="center" visible={visible} className={prefixCls}>
        {title ? <div className={`${prefixCls}__title`}>{title}</div> : ''}
        <div
          className={`${prefixCls}__content`}
          onTouchStart={this.onWrapperTouchStart}
          onTouchEnd={this.onWrapperTouchEnd}
          onTouchMove={this.onWrapperTouchMove}
          onMouseMove={this.onWrapperTouchMove}
          onMouseUp={this.onWrapperMouseUp}
          onMouseDown={this.onWrapperMouseDown}
          onClick={this.close}
          // ref={(el) => { this.bindEvent(el); }}
        >
          <Carousel
            showPagination={false}
            onChange={this.onChange}
            activeIndex={currentIndex}
            swipeable={swipeable}
          >
            {this.renderImages()}
          </Carousel>
        </div>
        <div className={`${prefixCls}__footer`}>
          {this.showOriginButton(images, activeIndex) && (loaded !== LoadStatus.after)
            ? (
              <button className={`${prefixCls}__origin__button`} onClick={this.loadOrigin}>
                {loaded === LoadStatus.start ? <ActivityIndicator className={`${prefixCls}__loading`} type="spinner" /> : ''}
                { locale![loaded]}
              </button>
            ) : ''}
          {images && images.length && <div className={`${prefixCls}__index`}>{currentIndex + 1}/{images.length}</div>}
        </div>
      </Popup>
    );
  }
}

export default LocaleReceiver('ImagePreview')(ImagePreview);
