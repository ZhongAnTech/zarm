import React, { useState } from 'react';
import { createBEM } from '@zarm-design/bem';
import ImagePreview from '../image-preview';
import { ConfigContext } from '../n-config-provider';

export const IMAGE_STATUS = {
  PENDING: 'pending',
  LOADING: 'loading',
  LOADED: 'loaded',
  FAILED: 'failed',
};

export interface ImageCssVars {
  '--default-background-color'?: React.CSSProperties['color'];
  '--default-text-color'?: React.CSSProperties['color'];
  '--default-font-size'?: React.CSSProperties['fontSize'];
  '--default-radius'?: React.CSSProperties['borderRadius'];
}

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'placeholder'> {
  placeholder?: React.ReactNode | boolean;
  fallback?: React.ReactNode | boolean;
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  shape?: 'rect' | 'radius' | 'round' | 'circle';
  preview?: boolean;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const {
    src,
    placeholder,
    fallback,
    alt,
    onLoad,
    onError,
    className,
    width,
    height,
    style,
    fit,
    shape,
    preview,
    ...restProps
  } = props;
  const [status, setStatus] = useState(IMAGE_STATUS.LOADING);

  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('image', { prefixCls });
  const cls = bem([{ [`${shape}`]: !!shape }, className]);

  const imgRef = ref || React.createRef<HTMLImageElement>();

  const inIframe = window.self !== window.top;

  const orientation = inIframe ? 'portrait' : '';

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    onLoad && onLoad(event);
    setStatus(IMAGE_STATUS.LOADED);
  };

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    onError && onError(event);
    setStatus(IMAGE_STATUS.FAILED);
  };

  const handlePreview = () => {
    if (preview) {
      ImagePreview.show({ images: [src], orientation });
    }
  };

  const renderImageStatus = {
    [IMAGE_STATUS.LOADED]: () => null,
    [IMAGE_STATUS.FAILED]: () => {
      if (fallback) {
        return <div className={bem('fallback')}>{fallback}</div>;
      }

      return null;
    },
    [IMAGE_STATUS.LOADING]: () => {
      if (placeholder) {
        return <div className={bem('loading')}>{placeholder}</div>;
      }

      return null;
    },
  };

  return (
    <div className={`${cls}`} style={{ width, height, ...style }} onClick={handlePreview}>
      <img
        className={bem('img')}
        src={src}
        alt={alt}
        ref={imgRef}
        style={{
          objectFit: fit,
        }}
        {...restProps}
        onError={handleError}
        onLoad={handleLoad}
      />
      {renderImageStatus[status]()}
    </div>
  );
});

Image.displayName = 'Image';
Image.defaultProps = {
  width: '100%',
  height: '100%',
  placeholder: true,
  fallback: true,
  fit: 'fill',
  shape: 'rect',
  preview: false,
};

export default Image;
