import * as React from 'react';
import type { BaseImagePropsProps } from './interface';
import { ConfigContext } from '../n-config-provider';
import useImage, { IMAGE_STATUS } from './useImage';

export type ImageProps = BaseImagePropsProps & React.HTMLAttributes<HTMLImageElement>;

const Image = React.forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const { src, placeholder, fallback, alt, onLoad, onError, ...restProps } = props;

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-image`;

  const imgRef = ref || React.createRef<HTMLImageElement>();
  const status = useImage({ src, onLoad, onError });

  let content;

  switch (status) {
    case IMAGE_STATUS.LOADED:
      content = <img src={src} alt={alt} ref={imgRef} {...restProps} />;
      break;
    case IMAGE_STATUS.FAILED:
      if (fallback) {
        content = fallback;
      } else {
        content = <span className={`${prefixCls}-fallback`}>图片加载失败</span>;
      }
      break;
    default:
      if (placeholder) {
        content = placeholder;
      } else {
        content = <span className={`${prefixCls}-placeholder`}>加载中</span>;
      }
      break;
  }

  return content;
});

Image.displayName = 'Image';

export default Image;
