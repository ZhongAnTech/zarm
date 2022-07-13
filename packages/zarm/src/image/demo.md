# Image 图片

## 基本用法

```jsx
import { Image } from 'zarm';
const imgSrc = 'https://cdn-health.zhongan.com/zarm/imagePreview/1.jpg';
ReactDOM.render(
  <>
    <Image src={imgSrc} width="100px" height="100px" />
  </>,
  mountNode,
);
```

## 多种填充模式

```jsx
import { Image } from 'zarm';
const imgSrc = 'https://cdn-health.zhongan.com/zarm/imagePreview/1.jpg';
ReactDOM.render(
  <>
    <Image src={imgSrc} width="100px" height="100px" fit="fill" />
    <Image src={imgSrc} width="100px" height="100px" fit="contain" />
    <Image src={imgSrc} width="100px" height="100px" fit="cover" />
    <Image src={imgSrc} width="100px" height="100px" fit="scale-down" />
    <Image src={imgSrc} width="100px" height="100px" fit="none" />
  </>,
  mountNode,
);
```

## 多种形状

```jsx
import { Image } from 'zarm';
const imgSrc = 'https://cdn-health.zhongan.com/zarm/imagePreview/1.jpg';
ReactDOM.render(
  <>
    <Image src={imgSrc} width="100px" height="200px" shape="rect" />
    <Image src={imgSrc} width="100px" height="200px" shape="radius" />
    <Image src={imgSrc} width="100px" height="200px" shape="round" />
    <Image src={imgSrc} width="100px" height="200px" shape="circle" />
  </>,
  mountNode,
);
```

## 图片加载失败

```jsx
import { Image } from 'zarm';
ReactDOM.render(<Image src="https://zarm.com" width="100px" height="100px" />, mountNode);
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

## 图片加载失败, 自定义 fallback element

```jsx
import { Image } from 'zarm';
ReactDOM.render(
  <Image
    src="https://zarm.com"
    width="100px"
    height="100px"
    placeholder="加载中..."
    fallback={<span>图片不见啦</span>}
  />,
  mountNode,
);
```

## 自定义占位显示

```jsx
import { Image } from 'zarm';
const imgSrc = 'https://cdn-health.zhongan.com/zarm/imagePreview/1.jpg';
ReactDOM.render(
  <>
    <Image
      src={imgSrc}
      width="100px"
      height="100px"
      placeholder={<span>加载中</span>}
      fallback={<span>图片不见啦</span>}
    />
  </>,
  mountNode,
);
```

## 点击预览

```jsx
import { Image } from 'zarm';
const imgSrc = 'https://cdn-health.zhongan.com/zarm/imagePreview/1.jpg';
ReactDOM.render(
  <>
    <Image src={imgSrc} width="100px" height="100px" shape="rect" preview />
  </>,
  mountNode,
);
```

## 懒加载

```jsx
import { Image } from 'zarm';
const imgSrc = 'https://cdn-health.zhongan.com/zarm/imagePreview/2.jpg';
ReactDOM.render(
  <>
    <Image src={imgSrc} width="100px" height="100px" lazy />
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

| 属性               | 默认值    | 说明     |
| :----------------- | :-------- | :------- |
| --background-color | '#fafafa' | 背景色   |
| --text-color       | '#343434' | 字体颜色 |
| --font-size        | '12px'    | 字体大小 |
