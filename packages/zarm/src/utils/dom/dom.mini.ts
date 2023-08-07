import Taro from '@tarojs/taro';

// const getContentHeight = (ele) => {
//   if (!ele) {
//     return 0;
//   }
//   const contentChildren = [...ele?.children];

//   console.log(contentChildren[0].offsetHeight)
//   return contentChildren.reduce((res, next) => {
//     res += next.offsetHeight;

//     console.log(next.offsetHeight);
//     return res;
//   }, 0);
// };

export const getRect = (id): Promise<Taro.NodesRef.BoundingClientRectCallbackResult> => {
  //   if (typeof document !== "undefined" && document?.getElementById) {
  //     return Promise.resolve({ height: getContentHeight(document.getElementById(`${id}`)) } as unknown as Taro.NodesRef.BoundingClientRectCallbackResult);
  //   }
  //     // return Promise.resolve(document.getElementById(`${id}`)?.getBoundingClientRect() as unknown as Taro.NodesRef.BoundingClientRectCallbackResult);
  //  // }
  return new Promise((resolve) => {
    Taro.createSelectorQuery()
      .select(`#${id}`)
      .boundingClientRect()
      .exec((rect) => {
        resolve(rect[0]);
      });
  });
};
