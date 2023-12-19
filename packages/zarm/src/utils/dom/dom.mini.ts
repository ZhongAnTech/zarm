import { useEffect } from 'react'
import { Events, getCurrentInstance, createSelectorQuery } from '@tarojs/taro'

export const getRect = (id): Promise<Taro.NodesRef.BoundingClientRectCallbackResult> => {
  return new Promise((resolve) => {
    createSelectorQuery()
      .select(`#${id}`)
      .boundingClientRect()
      .exec(([rect]) => {
        resolve(rect);
      });
  });
};

export const getRects = (
  query: string,
): Promise<Taro.NodesRef.BoundingClientRectCallbackResult> => {
  return new Promise((resolve) => {
    createSelectorQuery()
      .selectAll(query)
      .boundingClientRect()
      .exec(([rect]) => {
        resolve(rect);
      });
  });
};

export const customEvents = new Events();

export function getCustomEventsPath(selector?: string) {
  selector = selector || ''
  const path = getCurrentInstance().router?.path;
  return path ? `${path}_${selector}` : selector;
}

export function useCustomEvent(selector: string, callback: any) {
  const path = getCustomEventsPath(selector);
  useEffect(() => {
    customEvents.on(path, callback);
    return () => {
      customEvents.off(path);
    }
  }, []);

  const trigger = <T = any>(args: T) => {
    customEvents.trigger(path, args);
  }

  const off = () => {
    customEvents.off(path);
  }

  return [trigger, off];
}
