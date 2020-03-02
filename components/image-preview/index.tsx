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
  after = '',
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

  carousel;

  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      images: formatImages(props.images),
      swipeable: true,
    };
    this.carousel = React.createRef();
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

  componentDidMount() {
    // console.log(this.popup)
  }

  shouldComponentUpdate(_nextProps, nextState) {
    const { images } = this.state;
    return isEqual(images, nextState.images);
  }

  onChange = (index) => {
    this.setState({
      // activeIndex: index,
      currentIndex: index,
    });
    this.moving = true;
  };

  onChangeEnd = () => {
    this.moving = false;
  };

  close = () => {
    if (!('ontouchend' in document) && !this.moving) {
      const { onHide } = this.props;
      if (typeof onHide === 'function') {
        onHide();
      }
    }
  };

  loadOrigin = () => {
    const { activeIndex = 0, images } = this.state;
    const { originUrl, loaded } = images[activeIndex];
    if (loaded !== LoadStatus.before) {
      return;
    }
    images[activeIndex].loaded = LoadStatus.start;
    this.setState({
      images,
    });

    const img = new Image();
    img.onload = () => {
      images[activeIndex].loaded = LoadStatus.end;
      images[activeIndex].url = originUrl;
      this.setState({
        images,
      });
      setTimeout(() => {
        images[activeIndex].loaded = LoadStatus.after;
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

  onWrapperTouchStart = () => {
    this.touchStartTime = Date.now();
    this.moving = false;
  };

  onWrapperTouchEnd = (e) => {
    const { onHide } = this.props;
    const deltaTime = Date.now() - this.touchStartTime;
    // prevent long tap to close component
    if (deltaTime < 300 && !this.moving) {
      if (!this.doubleClickTimer) {
        this.doubleClickTimer = setTimeout(() => {
          this.doubleClickTimer = null;
          if (typeof onHide === 'function') {
            onHide();
          }
        }, 300);
      } else {
        clearTimeout(this.doubleClickTimer);
        this.doubleClickTimer = null;
      }
    }

    if (e && !e.touches) {
      if (typeof onHide === 'function') {
        onHide();
      }
    }
  };

  onWrapperTouchMove = () => {
    this.moving = true;
  };

  pinchChange = ({ scale, x, y }) => {
    let flag = true;
    const { swipeable } = this.state;
    if (scale !== 1 || x !== 0 || y !== 0) {
      flag = false;
    }
    if (swipeable === flag) return false;
    this.setState({
      swipeable: flag,
    });
  };

  // pinchZoom = (flag) => {
  //   this.setState({
  //     pinchZoom: flag,
  //   });
  // };

  renderImages = () => {
    const { prefixCls } = this.props;
    const { images = [] } = this.state;
    return images.map((item, i) => {
      return (
        <div className={`${prefixCls}__item`} key={+i}>
          <PinchZoom
            className={`${prefixCls}__item__img`}
            onChange={this.pinchChange}
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
          onClick={this.close}
        >
          <Carousel
            showPagination={false}
            onChange={this.onChange}
            activeIndex={activeIndex}
            swipeable={swipeable}
            onChangeEnd={this.onChangeEnd}
            // ref={this.carousel}
            // onClick={this.close}
          >
            {this.renderImages()}
          </Carousel>
        </div>
        <div className={`${prefixCls}__footer`}>
          {this.showOriginButton(images, activeIndex) && loaded !== LoadStatus.after
            ? (
              <button className={`${prefixCls}__origin__button`} onClick={this.loadOrigin}>
                {loaded === LoadStatus.start ? <ActivityIndicator className={`${prefixCls}__loading`} type="spinner" /> : ''}
                { locale![loaded]}
              </button>
            ) : ''}
          {images && images.length ? <div className={`${prefixCls}__index`}>{currentIndex + 1}/{images.length}</div> : ''}
        </div>
      </Popup>
    );
  }
}

export default LocaleReceiver('ImagePreview')(ImagePreview);
