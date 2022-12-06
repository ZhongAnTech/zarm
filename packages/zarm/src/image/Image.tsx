import React, { useState, useContext, createRef } from 'react';
import { createBEM } from '@zarm-design/bem';
import ImagePreview from '../image-preview';
import { ConfigContext } from '../config-provider';
import LazyDetector from './lazy-detector';

export const IMAGE_STATUS = {
  PENDING: 'pending',
  LOADING: 'loading',
  LOADED: 'loaded',
  FAILED: 'failed',
};

export interface ImageCssVars {
  '--background'?: React.CSSProperties['background'];
  '--text-color'?: React.CSSProperties['color'];
  '--font-size'?: React.CSSProperties['fontSize'];
  '--radius'?: React.CSSProperties['borderRadius'];
  '--width'?: React.CSSProperties['width'];
  '--height'?: React.CSSProperties['height'];
}

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'placeholder'> {
  placeholder?: React.ReactNode | boolean;
  fallback?: React.ReactNode | boolean;
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  shape?: 'rect' | 'radius' | 'round' | 'circle';
  preview?: boolean;
  lazy?: boolean;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const {
    src,
    placeholder,
    fallback,
    alt,
    onLoad,
    onError,
    onClick,
    className,
    width,
    height,
    style,
    fit,
    shape,
    preview,
    lazy,
    ...restProps
  } = props;
  const [status, setStatus] = useState(IMAGE_STATUS.LOADING);
  const [initialized, setInitialized] = useState(!lazy);

  const { prefixCls, locale } = useContext(ConfigContext);
  const bem = createBEM('image', { prefixCls });
  const cls = bem([{ [`${shape}`]: !!shape }, className]);

  const imgRef = ref || createRef<HTMLImageElement>();

  const inIframe = window.self !== window.top;

  const orientation = inIframe ? 'portrait' : undefined;

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    onLoad && onLoad(event);
    setStatus(IMAGE_STATUS.LOADED);
  };

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    onError && onError(event);
    setStatus(IMAGE_STATUS.FAILED);
  };

  const handleClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    if (preview) {
      ImagePreview.show({ images: [src || ''], orientation });
    }
    onClick && onClick(event);
  };

  const renderImageStatus = {
    [IMAGE_STATUS.LOADED]: () => null,
    [IMAGE_STATUS.FAILED]: () => {
      if (fallback) {
        return (
          <div className={bem('fallback')}>
            {typeof fallback === 'boolean' ? locale?.Image?.loadFailed : fallback}
          </div>
        );
      }

      return null;
    },
    [IMAGE_STATUS.LOADING]: () => {
      if (placeholder) {
        return (
          <div className={bem('loading')}>
            {typeof placeholder === 'boolean' ? locale?.Image?.loading : placeholder}
          </div>
        );
      }

      return null;
    },
  };

  return (
    <div className={`${cls}`} style={{ width, height, ...style }}>
      {lazy && !initialized && (
        <LazyDetector
          onActive={() => {
            setInitialized(true);
          }}
        />
      )}
      <img
        className={bem('img')}
        src={initialized ? src : undefined}
        alt={alt}
        ref={imgRef}
        style={{
          objectFit: fit,
        }}
        {...restProps}
        onClick={handleClick}
        onError={handleError}
        onLoad={handleLoad}
      />
      {renderImageStatus[status]()}
    </div>
  );
});

Image.displayName = 'Image';
Image.defaultProps = {
  placeholder: false,
  fallback: false,
  fit: 'fill',
  shape: 'rect',
  preview: false,
  lazy: false,
};

export default Image;
