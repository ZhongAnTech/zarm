import React, { createRef, forwardRef, useState, useEffect, useImperativeHandle } from 'react';
import type { ContainerType } from 'src/utils/dom';
import ActionSheet, { ActionSheetProps } from './ActionSheet'
import renderToContainer from '../utils/renderToContainer';

interface Ref {
  close: () => void;
}

const useActionSheet = () => {

  const ref = createRef<Ref>();

  let unmount = () => {};

  const show = (props: Omit<ActionSheetProps, 'visible'>) => {

    // 卸载上个实例
    unmount();

    const Wrapper = forwardRef<Ref>((_, wrapperRef) => {
      const [visible, setVisible] = useState(false);

      useEffect(() => {
        setVisible(true);
      }, []);

      useImperativeHandle(wrapperRef, () => ({
        close: () => {
          setVisible(false);
        },
      }));

      return (
        <ActionSheet
          {...props}
          mountContainer={false}
          visible={visible}
          afterClose={() => {
            props.afterClose?.();
            unmount();
          }}
        />
      );
    });

    unmount = renderToContainer(props.mountContainer as ContainerType, <Wrapper ref={ref} />);
  };

  const hide = () => {
    ref.current?.close();
  };

  return {
    show,
    hide,
  };
};

export default useActionSheet;
