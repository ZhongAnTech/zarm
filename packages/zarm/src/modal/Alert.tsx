import * as React from 'react';
import type { AlertProps } from '../alert';
import Alert from '../alert';
import { renderImperatively } from '../utils/dom';

const alert = (props: Omit<AlertProps, 'visible'>) => {
  return new Promise((resolve) => {
    const { close } = renderImperatively(
      <Alert
        {...props}
        onConfirm={async () => {
          const result = await props.onConfirm?.();
          if (result === false) return;
          close();
          resolve(null);
        }}
      />,
    );
  });
};

export default alert;
