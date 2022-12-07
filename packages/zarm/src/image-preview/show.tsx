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
        onClose={() => {
          props.onClose?.();
          setVisible(false);
          // unmount();
          setTimeout(() => {
            unmount();
          }, 0);
        }}
        mountContainer={false}
      />
    );
  });
  const ref = React.createRef<Ref>();
  unmount = renderToContainer(<Wrapper ref={ref} />, props.mountContainer);
  return {
    close: () => {
      ref.current?.close();
    },
  };
};

export default show;
