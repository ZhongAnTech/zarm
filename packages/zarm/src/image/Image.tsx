import React from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../n-config-provider';
import useImage, { IMAGE_STATUS } from './useImage';

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

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-image`;
  const cls = classnames(prefixCls, className);

  const imgRef = ref || React.createRef<HTMLImageElement>();
  const status = useImage({ src, onLoad, onError });

  const renderImageStatus = {
    [IMAGE_STATUS.LOADED]: () => (
      <img className={`${prefixCls}__img`} src={src} alt={alt} ref={imgRef} {...restProps} />
    ),
    [IMAGE_STATUS.FAILED]: () => {
      const renderFallback = (text) => <div className={`${prefixCls}__fallback`}>{text}</div>;

      if (fallback) {
        return React.isValidElement(fallback) ? fallback : renderFallback(fallback);
      }

      return (
        <img className={`${prefixCls}__img`} src={src} alt={alt} ref={imgRef} {...restProps} />
      );
    },
    [IMAGE_STATUS.LOADING]: () => {
      if (placeholder) {
        return React.isValidElement(placeholder) ? (
          placeholder
        ) : (
          <div className={`${prefixCls}__loading`}>{placeholder}</div>
        );
      }

      return (
        <img className={`${prefixCls}__img`} src={src} alt={alt} ref={imgRef} {...restProps} />
      );
    },
  };

  return (
    <div className={cls} style={{ width, height, ...style }}>
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
