import * as React from 'react';
import { ImperativeHandler, renderImperatively } from '../utils/dom';
import Modal, { ModalProps } from './Modal';

export interface ModalShowProps
  extends Omit<ModalProps, 'visible' | 'destroy' | 'forceRender' | 'children'> {
  content?: React.ReactNode;
}

export type ModalShowHandler = Pick<ImperativeHandler, 'close'>;

const closeFn = new Set<() => void>();

export const show = (props: ModalShowProps) => {
  const { content, ...rest } = props;
  const handler: ModalShowHandler = renderImperatively(
    <Modal
      {...rest}
      afterClose={() => {
        closeFn.delete(handler.close);
        props.afterClose?.();
      }}
    >
      {content}
    </Modal>,
  );
  closeFn.add(handler.close);
  return handler;
};

export const clear = () => {
  closeFn.forEach((close) => close());
};
