import React, { useState } from 'react';
import classnames from 'classnames';
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
}

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'placeholder'> {
  placeholder?: React.ReactNode | boolean;
  fallback?: React.ReactNode | boolean;
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
    ...restProps
  } = props;
  const [status, setStatus] = useState(IMAGE_STATUS.LOADING);

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-image`;
  const cls = classnames(prefixCls, className);

  const imgRef = ref || React.createRef<HTMLImageElement>();

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    onLoad && onLoad(event);
    setStatus(IMAGE_STATUS.LOADED);
  };

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    onError && onError(event);
    setStatus(IMAGE_STATUS.FAILED);
  };

  const renderImageStatus = {
    [IMAGE_STATUS.LOADED]: () => null,
    [IMAGE_STATUS.FAILED]: () => {
      if (fallback) {
        return <div className={`${prefixCls}__fallback`}>{fallback}</div>;
      }

      return null;
    },
    [IMAGE_STATUS.LOADING]: () => {
      if (placeholder) {
        return <div className={`${prefixCls}__loading`}>{placeholder}</div>;
      }

      return null;
    },
  };

  return (
    <div className={cls} style={{ width, height, ...style }}>
      <img
        className={`${prefixCls}__img`}
        src={src}
        alt={alt}
        ref={imgRef}
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
};

export default Image;
