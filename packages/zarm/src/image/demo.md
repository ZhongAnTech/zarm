# Image 图片

## 基本用法

```jsx
import { Image } from 'zarm';
ReactDOM.render(
  <>
    <Image
      src="https://camo.githubusercontent.com/f5847256d81e5f8c31aee6554f749baf64654a131fed0fca987bd39e023a690f/68747470733a2f2f7a61726d2e64657369676e2f696d616765732f6c6f676f2e31613663666333302e737667"
      width="100px"
      height="100px"
    />
  </>,
  mountNode,
);
```

## 图片加载失败

```jsx
import { Image } from 'zarm';
ReactDOM.render(
  <Image
    src="https://zarm.com"
    width="100px"
    height="100px"
    placeholder="加载中..."
    fallback="图片不见啦........"
  />,
  mountNode,
);
```

## 图片加载失败,且关闭 fallback

```jsx
import { Image } from 'zarm';
ReactDOM.render(
  <Image
    src="https://zarm.com"
    width="100px"
    height="100px"
    placeholder="加载中..."
    fallback={false}
    onError={() => {
      console.log('trigger error');
    }}
  />,
  mountNode,
);
```

## 自定义占位显示

```jsx
import { Image } from 'zarm';
ReactDOM.render(
  <>
    <Image
      src="https://camo.githubusercontent.com/f5847256d81e5f8c31aee6554f749baf64654a131fed0fca987bd39e023a690f/68747470733a2f2f7a61726d2e64657369676e2f696d616765732f6c6f676f2e31613663666333302e737667"
      width="100px"
      height="100px"
      placeholder={<span>加载中</span>}
      fallback={<span>图片不见啦</span>}
    />
  </>,
  mountNode,
);
```

## API

| 属性        | 类型                                                    | 默认值 | 说明                                         |
| :---------- | :------------------------------------------------------ | :----- | :------------------------------------------- |
| src         | string                                                  | -      | 图片地址                                     |
| placeholder | ReactNode                                               | true   | 加载中的占位显示，为 `true` 时使用默认显示   |
| fallback    | ReactNode                                               | true   | 加载失败的容错显示，为 `true` 时使用默认显示 |
| width       | string \| number                                        | -      | 图像宽度                                     |
| height      | string \| number                                        | -      | 图像高度                                     |
| alt         | string                                                  | -      | 图片描述                                     |
| onLoad      | (event: React.SyntheticEvent<HTMLImageElement>) => void | -      | 加载时触发的回调函数                         |
| onError     | (event: React.SyntheticEvent<HTMLImageElement>) => void | -      | 加载出错时触发的回调函数                     |

## CSS 变量

| 属性                       | 默认值    | 说明     |
| :------------------------- | :-------- | :------- |
| --default-background-color | '#fafafa' | 背景色   |
| --default-text-color       | '#343434' | 字体颜色 |
| --default-font-size        | '12px'    | 字体大小 |
