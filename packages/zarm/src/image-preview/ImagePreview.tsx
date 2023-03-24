import React, { HtmlHTMLAttributes, useEffect, useState } from 'react';
import { createBEM } from '@zarm-design/bem';
import { useDrag, ReactDOMAttributes } from '@use-gesture/react';
import type { Images, BaseImagePreviewProps } from './interface';
import Popup from '../popup';
import Carousel from '../carousel'
import Button from '../button';
import { ConfigContext } from '../config-provider';
import Loading from '../loading';
import PinchZoom from '../pinch-zoom';
import type { HTMLProps } from '../utils/utilityTypes';
import formatImages from './utils/formatImages';
import LOAD_STATUS from './utils/loadStatus';
import showOriginButton from './utils/showOriginButton';

export interface ImagePreviewCssVars {
  '--footer-padding'?: React.CSSProperties['padding'];
  '--pagination-text-color'?: React.CSSProperties['color'];
  '--pagination-font-size'?: React.CSSProperties['fontSize'];
}

export type ImagePreviewProps = BaseImagePreviewProps & HTMLProps<ImagePreviewCssVars>;

const imageStyle = {
  maxWidth: window?.innerWidth <= window?.innerHeight ? window?.innerWidth : undefined,
  maxHeight: window?.innerHeight <= window?.innerWidth ? window?.innerHeight : undefined,
};

const Content: React.FC<{ minScale: number; maxScale: number; imgSrc: string }> = (props) => {
  const { minScale, maxScale, imgSrc } = props;
  const [loaded, setLoaded] = useState(false);
  const style = loaded ? {...imageStyle, display: 'block'} : imageStyle;

  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('image-preview', { prefixCls });

  return (
    <>
      { !loaded ?
        (
          <div className={bem('loading')}>
            <Loading type="spinner" size="lg" />
          </div>
        ) : null
      }
      <PinchZoom minScale={minScale} maxScale={maxScale}>
        <img
          src={imgSrc}
          alt=""
          draggable={false}
          style={style}
          onLoad={() => setLoaded(true) }
        />
      </PinchZoom>
    </>
  );
}

const ImagePreview = React.forwardRef<HTMLDivElement, ImagePreviewProps>((props, ref) => {
  const {
    visible,
    activeIndex,
    onClose,
    showPagination,
    minScale,
    maxScale,
    className,
    style,
    mountContainer,
  } = props;

  const [images, setImages] = useState<Images>(formatImages(props.images));
  const [currentIndex, setCurrentIndex] = useState<number>(activeIndex!);

  const { prefixCls, locale } = React.useContext(ConfigContext);
  const bem = createBEM('image-preview', { prefixCls });

  useEffect(() => {
    setImages(formatImages(props.images));
  }, [props.images, visible]);

  useEffect(() => {
    setCurrentIndex(activeIndex!);
  }, [activeIndex]);

  const onChange = (index: number) => {
    setCurrentIndex(index);
    props.onChange?.(index);
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
      }, 0);
    };
    img.src = originSrc;
    event.stopPropagation();
    return false;
  };

  const bindEvent = useDrag((state) => {
    if (state.tap && state.elapsedTime > 0) {
      setTimeout(() => {
        onClose?.();
      }, 100);
    }
  }) as unknown as (...args: any[]) => ReactDOMAttributes;

  const loadEvent = useDrag((state) => {
    if (state.tap && state.elapsedTime > 0) {
      loadOrigin(state.event);
    }
  }) as unknown as (...args: any[]) => ReactDOMAttributes;

  const renderImages = () => {
    return images.map((item, i) => {
      return (
        <div className={bem('item')} key={+i}>
           <Content imgSrc={item.src} minScale={minScale} maxScale={maxScale} />
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
      className={bem([className])}
      style={style}
      direction="center"
      visible={visible}
      mountContainer={mountContainer}
      maskOpacity={1}
    >
      <>
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
              <Loading type="spinner" size="lg" />
            ))}
        </div>
        <div className={bem('footer')}>
          {renderOriginButton()}
          {renderPagination()}
        </div>
      </>
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
