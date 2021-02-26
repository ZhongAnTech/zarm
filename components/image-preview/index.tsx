import React, { Component } from 'react';
import PropsType, { ImageSrc } from './PropsType';
import Popup from '../popup';
import Carousel from '../carousel';
import PinchZoom from '../pinch-zoom';
import ActivityIndicator from '../activity-indicator';
import { isObject, isString } from '../utils/validate';
import ConfigReceiver from '../config-receiver';
import { Locale } from '../config-provider/PropsType';

export interface ImagePreviewProps extends PropsType {
  prefixCls?: string;
  className?: string;
  locale?: Locale['ImagePreview'];
}

enum LOAD_STATUS {
  before = 'loadBefore',
  start = 'loadStart',
  end = 'loadEnd',
  after = 'loadAfter',
}

type Images = Array<Partial<ImageSrc> & { loaded?: LOAD_STATUS }>;

export interface ImagePreviewState {
  images: Images;
  visible: boolean;
  activeIndex?: number;
  currentIndex?: number;
  prevVisible?: number;
  prevActiveIndex?: number;
}

const formatImages = (images: Array<ImageSrc> | Array<string>): Images => {
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
        loaded: LOAD_STATUS.before,
      });
    }
  });
  return previewImages;
};

const parseState = (props: ImagePreviewProps) => {
  const { visible, images } = props;
  return {
    visible,
    images: formatImages(images),
  };
};

class ImagePreview extends Component<ImagePreviewProps, ImagePreviewState> {
  static defaultProps = {
    prefixCls: 'za-image-preview',
    activeIndex: 0,
    showPagination: true,
  };

  doubleClickTimer;

  touchStartTime: number;

  moving: boolean;

  state: ImagePreviewState = parseState(this.props);

  static getDerivedStateFromProps(nextProps, state) {
    if (
      ('visible' in nextProps && nextProps.visible !== state.prevVisible) ||
      ('activeIndex' in nextProps && nextProps.activeIndex !== state.prevActiveIndex)
    ) {
      return {
        visible: nextProps.visible,
        activeIndex: nextProps.activeIndex,
        currentIndex: nextProps.activeIndex,
        images: formatImages(nextProps.images),
        prevVisible: nextProps.visible,
        prevActiveIndex: nextProps.activeIndex,
      };
    }
    return null;
  }

  // shouldComponentUpdate(_nextProps, nextState) {
  //   const { images } = this.state;
  //   return isEqual(images, nextState.images);
  // }

  onChange = (index) => {
    const { onChange } = this.props;
    this.setState(
      {
        currentIndex: index,
      },
      () => {
        if (typeof onChange === 'function') {
          onChange(index);
        }
      },
    );
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
    if (loaded !== LOAD_STATUS.before || !originUrl) {
      return;
    }
    images[currentIndex].loaded = LOAD_STATUS.start;
    this.setState({ images });

    const img = new Image();
    img.onload = () => {
      images[currentIndex].loaded = LOAD_STATUS.end;
      images[currentIndex].url = originUrl;
      this.setState({ images });
      setTimeout(() => {
        images[currentIndex].loaded = LOAD_STATUS.after;
        this.setState({ images });
      }, 1500);
    };
    img.src = originUrl;
  };

  showOriginButton = (images: Images, activeIndex): boolean => {
    if (
      images &&
      images[activeIndex] &&
      images[activeIndex].originUrl
      // && !images[activeIndex].loaded
    ) {
      return true;
    }
    return false;
  };

  onWrapperTouchStart = () => {
    this.touchStartTime = Date.now();
  };

  onWrapperTouchEnd = () => {
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
    this.moving = false;
  };

  onWrapperTouchMove = () => {
    if (this.touchStartTime) {
      this.moving = true;
    }
  };

  onWrapperMouseDown = () => {
    this.touchStartTime = Date.now();
  };

  onWrapperMouseUp = () => {
    setTimeout(() => {
      this.moving = false;
    }, 0);
    this.touchStartTime = 0;
  };

  renderImages = () => {
    const { prefixCls, minScale, maxScale } = this.props;
    const { images } = this.state;
    // const width = document.body.offsetWidth;
    return images.map((item, i) => {
      return (
        <div className={`${prefixCls}__item`} key={+i}>
          <PinchZoom className={`${prefixCls}__item__img`} minScale={minScale} maxScale={maxScale}>
            <img src={item.url} alt="" draggable={false} />
          </PinchZoom>
        </div>
      );
    });
  };

  render() {
    const { prefixCls, locale, activeIndex, showPagination } = this.props;
    const { currentIndex = 0, visible, images } = this.state;
    const { loaded } = images[currentIndex];
    return (
      <Popup direction="center" visible={visible} className={prefixCls}>
        <div
          className={`${prefixCls}__content`}
          onTouchStart={this.onWrapperTouchStart}
          onTouchEnd={this.onWrapperTouchEnd}
          onTouchCancel={this.onWrapperTouchEnd}
          onTouchMove={this.onWrapperTouchMove}
          onMouseDown={this.onWrapperMouseDown}
          onMouseMove={this.onWrapperTouchMove}
          onMouseUp={this.onWrapperMouseUp}
          onClick={this.close}
        >
          <Carousel showPagination={false} onChange={this.onChange} activeIndex={currentIndex}>
            {visible ? this.renderImages() : []}
          </Carousel>
        </div>
        <div className={`${prefixCls}__footer`}>
          {loaded && this.showOriginButton(images, activeIndex) && loaded !== LOAD_STATUS.after ? (
            <button className={`${prefixCls}__origin__button`} onClick={this.loadOrigin}>
              {loaded === LOAD_STATUS.start ? (
                <ActivityIndicator className={`${prefixCls}__loading`} type="spinner" />
              ) : (
                ''
              )}
              {locale![loaded]}
            </button>
          ) : (
            ''
          )}
          {visible && showPagination && images && images.length > 1 && (
            <div className={`${prefixCls}__index`}>
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </Popup>
    );
  }
}

export default ConfigReceiver('ImagePreview')(ImagePreview);
