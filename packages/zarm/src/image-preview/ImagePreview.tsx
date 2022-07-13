import React, { useEffect, useState } from 'react';
import { createBEM } from '@zarm-design/bem';
import { useGesture } from '@use-gesture/react';
import type { Images, BaseImagePreviewProps } from './interface';
import Popup from '../popup';
import Carousel from '../carousel';
import PinchZoom from '../pinch-zoom';
import ActivityIndicator from '../activity-indicator';
import Button from '../button';
import LOAD_STATUS from './utils/loadStatus';
import formatImages from './utils/formatImages';
import showOriginButton from './utils/showOriginButton';
import useOrientation from '../useOrientation';
import { ConfigContext } from '../n-config-provider';
import type { HTMLProps } from '../utils/utilityTypes';

export interface ImagePreviewCssVars {
  '--footer-padding'?: React.CSSProperties['padding'];
  '--pagination-text-color'?: React.CSSProperties['color'];
  '--pagination-font-size'?: React.CSSProperties['fontSize'];
}

export type ImagePreviewProps = BaseImagePreviewProps & HTMLProps<ImagePreviewCssVars>;

const ImagePreview = React.forwardRef<HTMLDivElement, ImagePreviewProps>((props, ref) => {
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

  const { prefixCls, locale } = React.useContext(ConfigContext);
  const bem = createBEM('image-preview', { prefixCls });

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

  const bindEvent = useGesture({
    onDrag: (state) => {
      if (state.tap && state.elapsedTime > 0) {
        if (typeof onClose === 'function') {
          onClose();
        }
      }
    },
  });

  const loadEvent = useGesture({
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
        <div className={bem('item')} key={+i}>
          <PinchZoom minScale={minScale} maxScale={maxScale}>
            <img src={item.src} alt="" draggable={false} style={imageStyle} />
          </PinchZoom>
        </div>
      );
    });
  };

  const renderPagination = () => {
    if (visible && showPagination && images && images.length > 1) {
      return (
        <div className={bem('pagination')} {...bindEvent()}>
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
        <Button size="xs" loading={loaded === LOAD_STATUS.start} {...loadEvent()}>
          {locale?.ImagePreview && locale?.ImagePreview?.[loaded]}
        </Button>
      );
    }

    return null;
  };

  return (
    <Popup
      direction="center"
      visible={visible}
      className={bem([className])}
      mountContainer={mountContainer}
      maskOpacity={1}
    >
      <div ref={ref} className={bem('content')} {...bindEvent()}>
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
      <div className={bem('footer')}>
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
