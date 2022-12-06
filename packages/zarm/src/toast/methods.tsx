import * as React from 'react';
import isString from 'lodash/isString';
import Toast, { ToastProps } from './Toast';
import renderToContainer from '../utils/renderToContainer';
import { RuntimeConfigProvider } from '../n-config-provider/ConfigProvider';

export interface ToastRef {
  hide: () => void;
}

export const show = (props: Omit<ToastProps, 'visible'> | string) => {
  let unmount = () => {};
  const rest = isString(props) ? { content: props } : props;

  const Wrapper = React.forwardRef<ToastRef>((_, wrapperRef) => {
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
      setVisible(true);
    }, []);

    React.useImperativeHandle(wrapperRef, () => ({
      hide: () => {
        setVisible(false);
      },
    }));

    return (
      <RuntimeConfigProvider>
        <Toast
          {...rest}
          visible={visible}
          afterClose={() => {
            rest.afterClose?.();
            unmount();
          }}
          mountContainer={false}
        />
      </RuntimeConfigProvider>
    );
  });

  const ref = React.createRef<ToastRef>();
  unmount = renderToContainer(<Wrapper ref={ref} />, rest.mountContainer);

  return {
    hide: () => {
      ref.current?.hide();
    },
  };
};
