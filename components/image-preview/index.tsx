import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import PropsType, { Iimage } from './PropsType';
import Popup from '../popup';
import Carousel from '../carousel';
import ActivityIndicator from '../activity-indicator';
import { isObject, isString } from '../utils/validate';
import LocaleReceiver from '../locale-receiver';
import { Locale } from '../locale-provider/PropsType';

export interface ImagePreviewProps extends PropsType {
  prefixCls?: string;
  className?: string;
  locale?: Locale['ImagePreview'];
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

  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      images: formatImages(props.images),
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
    this.setState({
      activeIndex: index,
    });
  };

  close = () => {
    const { onHide } = this.props;
    if (typeof onHide === 'function') {
      onHide();
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

  renderImages = () => {
    const { prefixCls } = this.props;
    const { images = [] } = this.state;
    return images.map((item, i) => {
      return (
        <div className={`${prefixCls}__item`} key={+i}>
          <img src={item.url} alt="" draggable={false} />
        </div>
      );
    });
  };

  render() {
    const { prefixCls, title, locale } = this.props;
    const { activeIndex = 0, visible, images } = this.state;
    const { loaded } = images[activeIndex];

    return (
      <Popup direction="center" visible={visible} className={prefixCls}>
        {title ? <div className={`${prefixCls}__title`}>{title}</div> : ''}
        <div className={`${prefixCls}__content`} onClick={this.close}>
          <Carousel
            showPagination={false}
            onChange={this.onChange}
            activeIndex={activeIndex}
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
          {images && images.length ? <div className={`${prefixCls}__index`}>{activeIndex + 1}/{images.length}</div> : ''}
        </div>
      </Popup>
    );
  }
}

export default LocaleReceiver('ImagePreview')(ImagePreview);
