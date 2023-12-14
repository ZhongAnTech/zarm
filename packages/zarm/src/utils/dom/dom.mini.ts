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

/* global WechatMiniprogram */
/* global getCurrentPages */

type Context = WechatMiniprogram.Page.TrivialInstance | WechatMiniprogram.Component.TrivialInstance;

export const getInstance = function (context?: Context, selector?: string) {
  if (!context) {
    const pages = getCurrentPages();
    const page = pages[pages.length - 1];
    context = page.$$basePage || page;
  }
  const instance = context ? context.selectComponent(selector) : null;
  if (!instance) {
    console.warn('未找到组件,请检查selector是否正确');
    return null;
  }
  return instance;
};