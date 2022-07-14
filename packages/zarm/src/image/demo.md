# Image 图片

## 基本用法

```jsx
import { Image } from 'zarm';
const imgSrc = 'https://static.zhongan.com/website/health/zarm/images/banners/1.png';
ReactDOM.render(
  <div style={{ display: 'flex' }}>
    <Image src={imgSrc} width="80px" height="80px" />
  </div>,
  mountNode,
);
```

## 多种填充模式

```jsx
import { Image, Grid } from 'zarm';
const imgSrc = 'https://static.zhongan.com/website/health/zarm/images/banners/1.png';
ReactDOM.render(
  <>
    <Grid square bordered={false}>
      <Grid.Item>
        <div className="block">
          <Image src={imgSrc} width="80px" height="80px" fit="fill" />
          <span>fill</span>
        </div>
      </Grid.Item>
      <Grid.Item>
        <div className="block">
          <Image src={imgSrc} width="80px" height="80px" fit="contain" />
          <span>contain</span>
        </div>
      </Grid.Item>
      <Grid.Item>
        <div className="block">
          <Image src={imgSrc} width="80px" height="80px" fit="cover" />
          <span>cover</span>
        </div>
      </Grid.Item>
      <Grid.Item>
        <div className="block">
          <Image src={imgSrc} width="80px" height="80px" fit="scale-down" />
          <span>scale-down</span>
        </div>
      </Grid.Item>
      <Grid.Item>
        <div className="block">
          <Image src={imgSrc} width="80px" height="80px" fit="none" />
          <span>none</span>
        </div>
      </Grid.Item>
    </Grid>
  </>,
  mountNode,
);
```

## 多种形状

```jsx
import { Image, Grid } from 'zarm';
const imgSrc = 'https://static.zhongan.com/website/health/zarm/images/banners/1.png';
ReactDOM.render(
  <Grid square bordered={false}>
    <Grid.Item>
      <div className="block">
        <Image src={imgSrc} width="80px" height="80px" shape="rect" />
        <span>rect</span>
      </div>
    </Grid.Item>
    <Grid.Item>
      <div className="block">
        <Image src={imgSrc} width="80px" height="80px" shape="radius" />
        <span>radius</span>
      </div>
    </Grid.Item>
    <Grid.Item>
      <div className="block">
        <Image src={imgSrc} width="80px" height="80px" shape="round" />
        <span>round</span>
      </div>
    </Grid.Item>
    <Grid.Item>
      <div className="block">
        <Image src={imgSrc} width="80px" height="80px" shape="circle" />
        <span>circle</span>
      </div>
    </Grid.Item>
  </Grid>,
  mountNode,
);
```

## 图片加载失败

```jsx
import { Image, Grid } from 'zarm';
ReactDOM.render(
  <Grid square bordered={false}>
    <Grid.Item>
      <div className="block">
        <Image src="https://zarm.com" width="80px" height="80px" />
        <span>默认显示</span>
      </div>
    </Grid.Item>
    <Grid.Item>
      <div className="block">
        <Image
          src="https://zarm.com"
          width="80px"
          height="80px"
          placeholder="加载中..."
          fallback={false}
          alt="加载失败图片"
          onError={() => {
            console.log('trigger error');
          }}
        />
        <span>关闭默认显示</span>
      </div>
    </Grid.Item>
    <Grid.Item>
      <div className="block">
        <Image
          src="https://zarm.com"
          width="80px"
          height="80px"
          placeholder="加载中..."
          fallback={<span>图片不见啦</span>}
        />
        <span>自定义显示</span>
      </div>
    </Grid.Item>
  </Grid>,
  mountNode,
);
```

## 自定义占位显示

```jsx
import { Image } from 'zarm';
const imgSrc = 'https://static.zhongan.com/website/health/zarm/images/banners/1.png';
ReactDOM.render(
  <div style={{ display: 'flex' }}>
    <Image
      src={imgSrc}
      width="80px"
      height="80px"
      placeholder={<span>加载中</span>}
      fallback={<span>图片不见啦</span>}
    />
  </div>,
  mountNode,
);
```

## 点击预览

```jsx
import { Image } from 'zarm';
const imgSrc = 'https://static.zhongan.com/website/health/zarm/images/banners/1.png';
ReactDOM.render(
  <div style={{ display: 'flex' }}>
    <Image src={imgSrc} width="80px" height="80px" shape="rect" preview />
  </div>,
  mountNode,
);
```

## 懒加载

```jsx
import { Image } from 'zarm';
const imgSrc = 'https://static.zhongan.com/website/health/zarm/images/banners/1.png';
ReactDOM.render(
  <div style={{ display: 'flex' }}>
    <Image src={imgSrc} width="80px" height="80px" lazy />
  </div>,
  mountNode,
);
```

## API

| 属性        | 类型                                                     | 默认值 | 说明                                         |
| :---------- | :------------------------------------------------------- | :----- | :------------------------------------------- |
| src         | string                                                   | -      | 图片地址                                     |
| placeholder | ReactNode                                                | true   | 加载中的占位显示，为 `true` 时使用默认显示   |
| fallback    | ReactNode                                                | true   | 加载失败的容错显示，为 `true` 时使用默认显示 |
| width       | string \| number                                         | -      | 图像宽度                                     |
| height      | string \| number                                         | -      | 图像高度                                     |
| alt         | boolean                                                  | -      | 图片描述                                     |
| lazy        | string                                                   | false  | 是否懒加载                                   |
| shape       | 'rect' \| 'radius' \| 'round' \| 'circle'                | 'rect' | 图片形状                                     |
| fill        | 'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale-down' | 'fill' | 图片填充模式                                 |
| preview     | boolean                                                  | false  | 是否支持图片预览                             |
| onLoad      | (event: React.SyntheticEvent<HTMLImageElement>) => void  | -      | 加载时触发的回调函数                         |
| onError     | (event: React.SyntheticEvent<HTMLImageElement>) => void  | -      | 加载出错时触发的回调函数                     |

## CSS 变量

| 属性               | 默认值    | 说明     |
| :----------------- | :-------- | :------- |
| --background-color | '#fafafa' | 背景色   |
| --text-color       | '#343434' | 字体颜色 |
| --font-size        | '12px'    | 字体大小 |
