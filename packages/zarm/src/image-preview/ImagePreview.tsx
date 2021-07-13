/* eslint-disable import/no-duplicates */
import React, { useCallback, useEffect, useState, useRef } from 'react';
import classnames from 'classnames';
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
  const doubleClickTimer = useRef<ReturnType<typeof setTimeout> | null>();

  const touchStartTime = useRef<number>(Date.now());

  const imagePreviewRef = (ref as any) || React.createRef<HTMLDivElement>();

  const { locale: globalLocal, prefixCls: globalPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = `${globalPrefixCls}-image-preview`;

  const moving = useRef<boolean>();

  const {
    visible,
    activeIndex = 0,
    onClose,
    showPagination,
    minScale,
    maxScale,
    className,
  } = props;

  const { type, angle } = useOrientation();

  let orientation =
    type === 'landscape-primary' || type === 'landscape-secondary' ? 'landscape' : 'portrait';

  if (!type) {
    // mobile default angle 0 and orientation portrait-primary
    orientation = angle === 90 || angle === -90 ? 'landscape' : 'portrait';
  }

  const [images, setImages] = useState<Images>(formatImages(props.images));
  const [currentIndex, setCurrentIndex] = useState<number>(activeIndex);

  useEffect(() => {
    setImages(formatImages(props.images));
  }, [props.images]);

  useEffect(() => {
    setCurrentIndex(activeIndex);
  }, [activeIndex]);

  const onChange = (index: number) => {
    setCurrentIndex(index);
    if (typeof props.onChange === 'function') {
      props.onChange(index);
    }
  };

  const close = () => {
    if (moving.current) {
      return false;
    }
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const loadOrigin = () => {
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
  };

  const onWrapperTouchStart = useCallback(() => {
    touchStartTime.current = Date.now();
  }, []);

  const onWrapperTouchEnd = useCallback(() => {
    const deltaTime = Date.now() - touchStartTime.current;
    // prevent long tap to close component
    if (deltaTime < 300) {
      if (!doubleClickTimer.current && !moving.current) {
        doubleClickTimer.current = setTimeout(() => {
          doubleClickTimer.current = null;
          if (typeof onClose === 'function') {
            onClose();
          }
        }, 300);
      } else {
        doubleClickTimer.current && clearTimeout(doubleClickTimer.current);
        doubleClickTimer.current = null;
      }
    }
    moving.current = false;
  }, [onClose]);

  const onWrapperTouchMove = useCallback(() => {
    if (touchStartTime.current) {
      moving.current = true;
    }
  }, []);

  const onWrapperMouseDown = useCallback(() => {
    touchStartTime.current = Date.now();
  }, []);

  const onWrapperMouseUp = useCallback(() => {
    setTimeout(() => {
      moving.current = false;
    }, 0);
    touchStartTime.current = 0;
  }, []);

  const renderImages = () => {
    const height = Math.min(window?.innerHeight, window?.innerWidth);
    const style = {
      height: orientation === 'landscape' ? height : '',
    };
    return images.map((item, i) => {
      return (
        <div className={`${prefixCls}__item`} key={+i}>
          <PinchZoom className={`${prefixCls}__item__img`} minScale={minScale} maxScale={maxScale}>
            <img src={item.src} alt="" draggable={false} style={style} />
          </PinchZoom>
        </div>
      );
    });
  };

  const renderPagination = () => {
    if (visible && showPagination && images && images.length > 1) {
      return (
        <div className={`${prefixCls}__index`}>
          {currentIndex + 1} / {images?.length}
        </div>
      );
    }
    return null;
  };

  const renderOriginButton = () => {
    if (images?.length === 0) return;

    const { loaded } = images?.[currentIndex || 0];
    if (loaded && showOriginButton(images, currentIndex) && loaded !== LOAD_STATUS.after) {
      return (
        <button className={`${prefixCls}__origin__button`} onClick={loadOrigin}>
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
    <Popup direction="center" visible={visible} className={classnames(prefixCls, className)}>
      <div
        className={cls}
        onTouchStart={onWrapperTouchStart}
        onTouchEnd={onWrapperTouchEnd}
        onTouchCancel={onWrapperTouchEnd}
        onTouchMove={onWrapperTouchMove}
        onMouseDown={onWrapperMouseDown}
        onMouseMove={onWrapperTouchMove}
        onMouseUp={onWrapperMouseUp}
        onClick={close}
        ref={imagePreviewRef}
      >
        {visible &&
          (images?.length ? (
            <Carousel showPagination={false} onChange={onChange} activeIndex={currentIndex}>
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
