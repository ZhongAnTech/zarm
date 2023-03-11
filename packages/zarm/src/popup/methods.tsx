import * as React from 'react';
import { ImperativeHandler, renderImperatively } from '../utils/dom';
import Popup, { PopupProps } from './Popup';

export interface PopupShowProps
  extends Omit<PopupProps, 'visible' | 'destroy' | 'forceRender' | 'children'> {
  content?: React.ReactNode;
}

export type PopupShowHandler = Pick<ImperativeHandler, 'close'>;

const closeFn = new Set<() => void>();

export const show = (props: PopupShowProps) => {
  const { content, ...rest } = props;
  const handler: PopupShowHandler = renderImperatively(
    <Popup
      {...rest}
      afterClose={() => {
        closeFn.delete(handler.close);
        props.afterClose?.();
      }}
    >
      {content}
    </Popup>,
  );
  closeFn.add(handler.close);
  return handler;
};

export const clear = () => {
  closeFn.forEach((close) => close());
};
