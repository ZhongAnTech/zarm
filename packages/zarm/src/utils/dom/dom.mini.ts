import Taro from '@tarojs/taro';

export const getRect = (id): Promise<Taro.NodesRef.BoundingClientRectCallbackResult> => {
  return new Promise((resolve) => {
    Taro.createSelectorQuery()
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
    Taro.createSelectorQuery()
      .selectAll(query)
      .boundingClientRect()
      .exec(([rect]) => {
        resolve(rect);
      });
  });
};
