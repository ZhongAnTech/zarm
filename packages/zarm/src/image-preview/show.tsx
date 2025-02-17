import * as React from 'react';
import { renderImperatively } from '../utils/dom';
import ImagePreview, { ImagePreviewProps } from './ImagePreview';

const show = (props: Omit<ImagePreviewProps, 'visible'>) => {
  const { close } = renderImperatively(<ImagePreview {...props} />);

  return { close };
};

export default show;
