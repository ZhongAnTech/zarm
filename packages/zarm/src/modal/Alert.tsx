import * as React from 'react';
import Alert from '../alert';
import renderToContainer from '../utils/renderToContainer';
import { RuntimeConfigProvider } from '../n-config-provider/ConfigProvider';
import type { AlertProps } from '../alert';
import type { ContainerType } from '../utils/dom';

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
            mountContainer={false}
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
          />
        </RuntimeConfigProvider>
      );
    };

    unmount = renderToContainer(props.mountContainer as ContainerType, <Wrapper />);
  });
};

export default alert;
