import React, { useState, useEffect, useImperativeHandle } from 'react';

import renderToContainer from '../utils/renderToContainer';
import ImagePreview, { ImagePreviewProps } from './ImagePreview';

interface Ref {
  close: () => void;
}

const show = (props: Omit<ImagePreviewProps, 'visible'>) => {
  let unmount;
  const Wrapper = React.forwardRef<Ref>((_, ref) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
      setVisible(true);
    }, []);
    useImperativeHandle(ref, () => ({
      close: () => {
        setVisible(false);
      },
    }));
    return (
      <ImagePreview
        {...props}
        visible={visible}
        mountContainer={false}
        onClose={() => {
          props.onClose?.();
          setVisible(false);
          unmount();
        }}
      />
    );
  });
  const ref = React.createRef<Ref>();
  const { mountContainer = false, className } = props;

  const slot = document.createElement('div');
  slot.classList.add('za-image-preview-container');
  className && slot.classList.add(className);

  unmount = renderToContainer(mountContainer, <Wrapper ref={ref} />, slot);
  return {
    close: () => {
      ref.current?.close();
    },
  };
};

export default show;
