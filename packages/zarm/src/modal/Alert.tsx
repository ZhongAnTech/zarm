import * as React from 'react';
import Alert from '../alert';
import renderToContainer from '../utils/renderToContainer';
import { RuntimeConfigProvider } from '../config-provider/ConfigProvider';
import type { AlertProps } from '../alert';

const alert = (props: Omit<AlertProps, 'visible'>) => {
  return new Promise((resolve) => {
    let unmount = () => {};
    const Wrapper = () => {
      const [visible, setVisible] = React.useState(false);
      React.useEffect(() => {
        setVisible(true);
      }, []);

      return (
        <RuntimeConfigProvider>
          <Alert
            {...props}
            visible={visible}
            onCancel={async () => {
              const close = await props.onCancel?.();
              if (close === false) return;
              setVisible(false);
              resolve(null);
            }}
            afterClose={() => {
              props.afterClose?.();
              unmount();
            }}
            mountContainer={false}
          />
        </RuntimeConfigProvider>
      );
    };

    unmount = renderToContainer(<Wrapper />, props.mountContainer);
  });
};

export default alert;
