import React from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../n-config-provider';
import ActivityIndicator from '../activity-indicator';
import useImage, { IMAGE_STATUS } from './useImage';
import type { ImageProps } from './interface';

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
    <div className={cls} style={{ width, height }}>
      {renderImageStatus[status]()}
    </div>
  );
});

Image.displayName = 'Image';

Image.defaultProps = {
  width: '100%',
  height: '100%',
};

export default Image;
