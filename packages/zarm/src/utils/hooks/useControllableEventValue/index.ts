/* eslint-disable no-prototype-builtins */
import { useMemoizedFn, useUpdate } from 'ahooks';
import { useMemo, useRef } from 'react';

export interface Options<T> {
  defaultValue?: T;
  defaultValuePropName?: string;
  valuePropName?: string;
  trigger?: string;
}

export type Props = Record<string, any>;

export type ChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

export interface StandardProps<T> {
  value: T;
  defaultValue?: T;
  onChange: (event: ChangeEvent) => void;
}

function useControllableEventValue<T = any>(
  props: StandardProps<T>,
): [T, (event: ChangeEvent) => void];
function useControllableEventValue<T = any>(
  props?: Props,
  options?: Options<T>,
): [T, (event: ChangeEvent) => void];
function useControllableEventValue<T = any>(props: Props = {}, options: Options<T> = {}) {
  const {
    defaultValue,
    defaultValuePropName = 'defaultValue',
    valuePropName = 'value',
    trigger = 'onChange',
  } = options;

  const value = props[valuePropName] as T;
  const isControlled = props.hasOwnProperty(valuePropName);

  const initialValue = useMemo(() => {
    if (isControlled) {
      return value;
    }
    if (props.hasOwnProperty(defaultValuePropName)) {
      return props[defaultValuePropName];
    }
    return defaultValue;
  }, []);

  const stateRef = useRef(initialValue);
  if (isControlled) {
    stateRef.current = value;
  }

  const update = useUpdate();

  function setState(event: ChangeEvent) {
    if (!isControlled) {
      stateRef.current = event.target[valuePropName];
      update();
    }
    if (props[trigger]) {
      props[trigger](event);
    }
  }

  return [stateRef.current, useMemoizedFn(setState)] as const;
}

export default useControllableEventValue;
