/* eslint-disable import/no-duplicates */
import React, { useCallback, useEffect, useState, useRef } from 'react';
import classnames from 'classnames';
import type { Images, BaseImagePreviewProps } from './interface';
import Popup from '../popup';
import Carousel from '../carousel';
import PinchZoom from '../pinch-zoom';
import ActivityIndicator from '../activity-indicator';
import type { Locale } from '../config-provider/PropsType';
import LOAD_STATUS from './utils/loadStatus';
import formatImages from './utils/formatImages';
import showOriginButton from './utils/showOriginButton';
import useOrientation from '../useOrientation';

export interface ImagePreviewProps extends BaseImagePreviewProps {
  prefixCls?: string;
  className?: string;
  locale?: Locale['ImagePreview'];
}
export interface ImagePreviewState {
  images: Images;
  visible: boolean;
  activeIndex?: number;
  currentIndex?: number;
  showPagination: boolean;
  orientation: string;
}
function ImagePreview(props: ImagePreviewProps) {
  const doubleClickTimer = useRef<ReturnType<typeof setTimeout> | null>();

  const touchStartTime = useRef<number>(Date.now());

  const moving = useRef<boolean>();

  const {
    visible,
    activeIndex,
    images,
    onClose,
    showPagination,
    prefixCls,
    locale,
    minScale,
    maxScale,
  } = props;

  const { angle } = useOrientation();
  const orientation = angle === 90 || angle === -90 ? 'landscape' : 'portrait';

  // const { orientation = defaultOrientation, } = props;

  const [state, setState] = useState<ImagePreviewState>({
    visible,
    activeIndex,
    currentIndex: activeIndex,
    images: formatImages(images),
    showPagination,
    orientation,
  });

  useEffect(() => {
    setState({
      ...state,
      visible,
      activeIndex,
      currentIndex: activeIndex,
      images: formatImages(images),
      showPagination,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, activeIndex, images, showPagination]);

  useEffect(() => {
    setState({
      ...state,
      orientation,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orientation]);

  const onChange = (index: number) => {
    setState({
      ...state,
      currentIndex: index,
    });
    if (typeof props.onChange === 'function') {
      props.onChange(index);
    }
  };

  const close = () => {
    if (moving) {
      return false;
    }
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const loadOrigin = () => {
    const { images: imagesArr, currentIndex = 0 } = state;
    const { originUrl, loaded } = imagesArr[currentIndex];
    if (loaded !== LOAD_STATUS.before || !originUrl) {
      return;
    }
    imagesArr[currentIndex].loaded = LOAD_STATUS.start;
    setState({ ...state, images: imagesArr });

    const img = new Image();
    img.onload = () => {
      imagesArr[currentIndex].loaded = LOAD_STATUS.end;
      imagesArr[currentIndex].url = originUrl;
      setState({ ...state, images: imagesArr });
      setTimeout(() => {
        imagesArr[currentIndex].loaded = LOAD_STATUS.after;
        setState({ ...state, images: imagesArr });
      }, 1500);
    };
    img.src = originUrl;
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
    const { images: imagesArr } = state;
    const height = Math.min(window?.innerHeight, window?.innerWidth);
    const style = {
      height: state.orientation === 'landscape' ? height : '',
    };
    return imagesArr.map((item, i) => {
      return (
        <div className={`${prefixCls}__item`} key={+i}>
          <PinchZoom className={`${prefixCls}__item__img`} minScale={minScale} maxScale={maxScale}>
            <img src={item.url} alt="" draggable={false} style={style} />
          </PinchZoom>
        </div>
      );
    });
  };

  const renderPagination = () => {
    const { currentIndex = 0 } = state;
    if (state.visible && state.showPagination && state.images && state.images.length > 1) {
      return (
        <div className={`${prefixCls}__index`}>
          {currentIndex + 1} / {state?.images?.length}
        </div>
      );
    }
    return null;
  };

  const renderOriginButton = () => {
    if (state?.images?.length === 0) return;

    const { loaded } = state?.images?.[state?.currentIndex || 0];

    if (
      loaded &&
      showOriginButton(state.images, state?.currentIndex) &&
      loaded !== LOAD_STATUS.after
    ) {
      return (
        <button className={`${prefixCls}__origin__button`} onClick={loadOrigin}>
          {loaded === LOAD_STATUS.start && (
            <ActivityIndicator className={`${prefixCls}__loading`} type="spinner" />
          )}
          {locale && locale[loaded]}
        </button>
      );
    }

    return null;
  };
  const cls = classnames(`${prefixCls}__content`, `${prefixCls}__content--${state.orientation}`);
  return (
    <Popup direction="center" visible={visible} className={prefixCls}>
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
      >
        {visible &&
          (state.images?.length ? (
            <Carousel showPagination={false} onChange={onChange} activeIndex={state.currentIndex}>
              {renderImages()}
            </Carousel>
          ) : (
            <ActivityIndicator className={`${prefixCls}__loading`} type="spinner" size="lg" />
          ))}
      </div>
      <div className={`${prefixCls}__footer`}>
        {renderOriginButton()}
        {renderPagination()}
      </div>
    </Popup>
  );
}

ImagePreview.displayName = 'ImagePreview';

ImagePreview.defaultProps = {
  prefixCls: 'za-image-preview',
  activeIndex: 0,
  showPagination: true,
  visible: false,
  minScale: 1,
  maxScale: 3,
};
export default ImagePreview;
