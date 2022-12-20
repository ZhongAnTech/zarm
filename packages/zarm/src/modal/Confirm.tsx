import * as React from 'react';
import type { ConfirmProps } from '../confirm';
import Confirm from '../confirm';
import { renderImperatively } from '../utils/dom';

const confirm = (props: Omit<ConfirmProps, 'visible'>): Promise<boolean> => {
  return new Promise((resolve) => {
    const { close } = renderImperatively(
      <Confirm
        {...props}
        onConfirm={async () => {
          const result = await props.onConfirm?.();
          if (result === false) return;
          close();
          resolve(true);
        }}
        onCancel={async () => {
          const result = await props.onCancel?.();
          if (result === false) return;
          close();
          resolve(false);
        }}
      />,
    );
  });
};

export default confirm;
