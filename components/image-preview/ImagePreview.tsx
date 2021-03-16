/* eslint-disable import/no-duplicates */
import React, { Component } from 'react';
import type PropsType from './PropsType';
import type { Images } from './PropsType';
import Popup from '../popup';
import Carousel from '../carousel';
import PinchZoom from '../pinch-zoom';
import ActivityIndicator from '../activity-indicator';
import type { Locale } from '../config-provider/PropsType';
import LOAD_STATUS from './utils/loadStatus';
import formatImages from './utils/formatImages';
import showOriginButton from './utils/showOriginButton';

export interface ImagePreviewProps extends PropsType {
  prefixCls?: string;
  className?: string;
  locale?: Locale['ImagePreview'];
}

export interface ImagePreviewState {
  images: Images;
  visible: boolean;
  activeIndex?: number;
  currentIndex?: number;
  prevVisible?: boolean;
  prevActiveIndex?: number;
}

const parseState = (props: ImagePreviewProps): ImagePreviewState => {
  const { visible, images } = props;
  return {
    visible,
    images: formatImages(images),
  };
};

export default class ImagePreview extends Component<ImagePreviewProps, ImagePreviewState> {
  static defaultProps = {
    prefixCls: 'za-image-preview',
    activeIndex: 0,
    showPagination: true,
    visible: false,
  };

  doubleClickTimer: ReturnType<typeof setTimeout> | null;

  touchStartTime: number;

  moving: boolean;

  state: ImagePreviewState = parseState(this.props);

  static getDerivedStateFromProps(nextProps: ImagePreviewProps, state: ImagePreviewState) {
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

  onChange = (index: number) => {
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
        this.doubleClickTimer && clearTimeout(this.doubleClickTimer);
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

  renderPagination() {
    const { prefixCls, showPagination } = this.props;
    const { currentIndex = 0, visible, images } = this.state;

    if (visible && showPagination && images && images.length > 1) {
      return (
        <div className={`${prefixCls}__index`}>
          {currentIndex + 1} / {images.length}
        </div>
      );
    }
    return null;
  }

  render() {
    const { prefixCls, locale, activeIndex } = this.props;
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
          {loaded && showOriginButton(images, activeIndex) && loaded !== LOAD_STATUS.after ? (
            <button className={`${prefixCls}__origin__button`} onClick={this.loadOrigin}>
              {loaded === LOAD_STATUS.start ? (
                <ActivityIndicator className={`${prefixCls}__loading`} type="spinner" />
              ) : (
                ''
              )}
              {locale && locale[loaded]}
            </button>
          ) : (
            ''
          )}
          {this.renderPagination()}
        </div>
      </Popup>
    );
  }
}
