import * as React from 'react';
import Alert from '../alert';
import renderToContainer from '../utils/renderToContainer';
import type { AlertProps } from '../alert';
import type { ContainerType } from '../utils/dom';

const alert = ({ className, ...props }: Omit<AlertProps, 'visible'>) => {
  return new Promise((resolve) => {
    let unmount = () => {};
    const Wrapper = () => {
      const [visible, setVisible] = React.useState(false);
      React.useEffect(() => {
        setVisible(true);
      }, []);

      return (
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
      );
    };
    const slot = document.createElement('div');
    slot.classList.add('za-alert-container');
    className && slot.classList.add(className);

    unmount = renderToContainer(props.mountContainer as ContainerType, <Wrapper />, slot);
  });
};

export default alert;
