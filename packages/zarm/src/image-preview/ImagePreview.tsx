import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { useGesture } from '@use-gesture/react';
import type { Images, BaseImagePreviewProps } from './interface';
import Popup from '../popup';
import Carousel from '../carousel';
import PinchZoom from '../pinch-zoom';
import ActivityIndicator from '../activity-indicator';
import LOAD_STATUS from './utils/loadStatus';
import formatImages from './utils/formatImages';
import showOriginButton from './utils/showOriginButton';
import useOrientation from '../useOrientation';
import { ConfigContext } from '../n-config-provider';

export interface ImagePreviewProps extends BaseImagePreviewProps {
  className?: string;
}

const ImagePreview = React.forwardRef<unknown, ImagePreviewProps>((props, ref) => {
  const imagePreviewRef = (ref as any) || React.createRef<HTMLDivElement>();

  const { locale: globalLocal, prefixCls: globalPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = `${globalPrefixCls}-image-preview`;

  const {
    visible,
    activeIndex,
    onClose,
    showPagination,
    minScale,
    maxScale,
    className,
    orientation: defatultOrientation,
    mountContainer,
  } = props;

  const { type, angle } = useOrientation();

  let orientation = defatultOrientation;

  if (!orientation) {
    orientation =
      type === 'landscape-primary' || type === 'landscape-secondary' ? 'landscape' : 'portrait';

    if (!type) {
      // mobile default angle 0 and orientation portrait-primary
      orientation = angle === 90 || angle === -90 ? 'landscape' : 'portrait';
    }
  }

  const [images, setImages] = useState<Images>(formatImages(props.images));
  const [currentIndex, setCurrentIndex] = useState<number>(activeIndex!);

  useEffect(() => {
    setImages(formatImages(props.images));
  }, [props.images, visible]);

  useEffect(() => {
    setCurrentIndex(activeIndex!);
  }, [activeIndex]);

  const onChange = (index: number) => {
    setCurrentIndex(index);
    if (typeof props.onChange === 'function') {
      props.onChange(index);
    }
  };

  const loadOrigin = (event) => {
    const { originSrc, loaded } = images[currentIndex];
    if (loaded !== LOAD_STATUS.before || !originSrc) {
      return;
    }
    const newImages = [...images];
    newImages[currentIndex].loaded = LOAD_STATUS.start;
    setImages(newImages);

    const img = new Image();
    img.onload = () => {
      const loadImages = [...images];
      loadImages[currentIndex].loaded = LOAD_STATUS.end;
      loadImages[currentIndex].src = originSrc;
      setImages(loadImages);
      setTimeout(() => {
        const loadAfeterImages = [...images];
        loadAfeterImages[currentIndex].loaded = LOAD_STATUS.after;
        setImages(loadAfeterImages);
      }, 1500);
    };
    img.src = originSrc;
    event.stopPropagation();
    return false;
  };

  const bindEvent: any = useGesture({
    onDrag: (state) => {
      if (state.tap && state.elapsedTime > 0) {
        if (typeof onClose === 'function') {
          onClose();
        }
      }
    },
  });

  const loadEvent: any = useGesture({
    onDrag: (state) => {
      if (state.tap && state.elapsedTime > 0) {
        loadOrigin(state.event);
      }
    },
  });

  const renderImages = () => {
    const height = Math.min(window?.innerHeight, window?.innerWidth);
    const imageStyle = {
      height: orientation === 'landscape' ? height : '',
    };
    return images.map((item, i) => {
      return (
        <div className={`${prefixCls}__item`} key={+i}>
          <PinchZoom className={`${prefixCls}__item__img`} minScale={minScale} maxScale={maxScale}>
            <img src={item.src} alt="" draggable={false} style={imageStyle} />
          </PinchZoom>
        </div>
      );
    });
  };

  const renderPagination = () => {
    if (visible && showPagination && images && images.length > 1) {
      return (
        <div className={`${prefixCls}__index`} {...bindEvent()}>
          {currentIndex + 1} / {images?.length}
        </div>
      );
    }
    return null;
  };

  const renderOriginButton = () => {
    if (images?.length === 0) return;

    const { loaded } = images?.[currentIndex || 0];
    if (
      loaded &&
      showOriginButton(images, currentIndex) &&
      loaded !== LOAD_STATUS.after &&
      visible
    ) {
      return (
        <button className={`${prefixCls}__origin__button`} {...loadEvent()}>
          {loaded === LOAD_STATUS.start && (
            <ActivityIndicator className={`${prefixCls}__loading`} type="spinner" />
          )}
          {globalLocal?.ImagePreview && globalLocal?.ImagePreview?.[loaded]}
        </button>
      );
    }

    return null;
  };

  const cls = classnames(`${prefixCls}__content`, `${prefixCls}__content--${orientation}`);

  return (
    <Popup
      direction="center"
      visible={visible}
      className={classnames(prefixCls, className)}
      mountContainer={mountContainer}
    >
      <div className={cls} ref={imagePreviewRef} {...bindEvent()}>
        {visible &&
          (images?.length ? (
            <Carousel
              showPagination={false}
              onChange={onChange}
              activeIndex={currentIndex}
              swipeable
            >
              {renderImages()}
            </Carousel>
          ) : (
            <ActivityIndicator type="spinner" size="lg" />
          ))}
      </div>
      <div className={`${prefixCls}__footer`}>
        {renderOriginButton()}
        {renderPagination()}
      </div>
    </Popup>
  );
});

ImagePreview.displayName = 'ImagePreview';

ImagePreview.defaultProps = {
  activeIndex: 0,
  showPagination: true,
  visible: false,
  minScale: 1,
  maxScale: 3,
};

export default ImagePreview;
