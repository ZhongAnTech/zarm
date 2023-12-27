import * as React from 'react';
import { ImperativeHandler } from '../utils/dom';
import { ModalProps } from './Modal.mini';
import { getCustomEventsPath, customEvents } from '../utils/dom/dom.mini';

export interface ModalShowProps
  extends Omit<ModalProps, 'visible' | 'destroy' | 'forceRender' | 'children'> {
  content?: React.ReactNode;
  id: string;
}

export type ModalShowHandler = Pick<ImperativeHandler, 'close'>;

const closeFn = new Set<() => void>();

export const show = (props: ModalShowProps) => {
  const path = getCustomEventsPath(props.id);

  customEvents.trigger(path, {
    ...props,
    visible: true,
  });

  const close = () => {
    customEvents.trigger(path, {
      ...props,
      visible: false,
    });
  }
  closeFn.add(close);
  return {
    close,
  };
};

export const clear = () => {
  closeFn.forEach((close) => close());
};
