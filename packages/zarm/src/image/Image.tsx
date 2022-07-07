import React from 'react';
import classnames from 'classnames';
import ActivityIndicator from '../activity-indicator';
import { ConfigContext } from '../n-config-provider';
import useImage, { IMAGE_STATUS } from './useImage';

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

  const { prefixCls: globalPrefixCls, locale: globalLocal } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-image`;
  const cls = classnames(prefixCls, className);
  const locale = globalLocal?.Image;

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

      return renderFallback(locale?.loadFailed);
    },
    [IMAGE_STATUS.LOADING]: () => {
      console.log(placeholder, React.isValidElement(placeholder));
      if (placeholder) {
        return React.isValidElement(placeholder) ? (
          placeholder
        ) : (
          <div className={`${prefixCls}__loading`}>{placeholder}</div>
        );
      }

      return (
        <div className={`${prefixCls}__loading`}>
          <ActivityIndicator type="spinner" />
        </div>
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
