# Image 图片

## 基本用法

```jsx
import { Image } from 'zarm';
const imgSrc = 'https://static.zhongan.com/website/health/zarm/images/banners/1.png';

ReactDOM.render(
  <div className="block">
    <Image src={imgSrc} />
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
    <Grid
      square
      style={{
        '--za-image-width': '80px',
        '--za-image-height': '80px',
      }}
    >
      <Grid.Item>
        <div className="block">
          <Image src={imgSrc} fit="fill" />
          <span>fill</span>
        </div>
      </Grid.Item>
      <Grid.Item>
        <div className="block">
          <Image src={imgSrc} fit="contain" />
          <span>contain</span>
        </div>
      </Grid.Item>
      <Grid.Item>
        <div className="block">
          <Image src={imgSrc} fit="cover" />
          <span>cover</span>
        </div>
      </Grid.Item>
      <Grid.Item>
        <div className="block">
          <Image src={imgSrc} fit="scale-down" />
          <span>scale-down</span>
        </div>
      </Grid.Item>
      <Grid.Item>
        <div className="block">
          <Image src={imgSrc} fit="none" />
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
  <Grid
    square
    style={{
      '--za-image-width': '80px',
      '--za-image-height': '80px',
    }}
  >
    <Grid.Item>
      <div className="block">
        <Image src={imgSrc} shape="rect" />
        <span>rect</span>
      </div>
    </Grid.Item>
    <Grid.Item>
      <div className="block">
        <Image src={imgSrc} shape="radius" />
        <span>radius</span>
      </div>
    </Grid.Item>
    <Grid.Item>
      <div className="block">
        <Image src={imgSrc} shape="circle" />
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
  <Grid
    square
    style={{
      '--za-image-width': '80px',
      '--za-image-height': '80px',
    }}
  >
    <Grid.Item>
      <div className="block">
        <Image src="https://zarm.com" />
        <span>默认显示</span>
      </div>
    </Grid.Item>
    <Grid.Item>
      <div className="block">
        <Image
          src="https://zarm.com"
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
        <Image src="https://zarm.com" placeholder="加载中..." fallback={<span>图片不见啦</span>} />
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
  <div className="block">
    <Image src={imgSrc} placeholder={<span>加载中</span>} fallback={<span>图片不见啦</span>} />
  </div>,
  mountNode,
);
```

## 点击预览

```jsx
import { Image } from 'zarm';
const imgSrc = 'https://static.zhongan.com/website/health/zarm/images/banners/1.png';

ReactDOM.render(
  <div className="block">
    <Image preview src={imgSrc} shape="rect" />
  </div>,
  mountNode,
);
```

## 懒加载

```jsx
import { Image } from 'zarm';
const imgSrc = 'https://static.zhongan.com/website/health/zarm/images/banners/1.png';

ReactDOM.render(
  <div className="block">
    <Image lazy src={imgSrc} />
  </div>,
  mountNode,
);
```

## API

| 属性        | 类型                                                     | 默认值 | 说明                                         |
| :---------- | :------------------------------------------------------- | :----- | :------------------------------------------- |
| src         | string                                                   | -      | 图片地址                                     |
| placeholder | ReactNode                                                | false  | 加载中的占位显示，为 `true` 时使用默认显示   |
| fallback    | ReactNode                                                | false  | 加载失败的容错显示，为 `true` 时使用默认显示 |
| width       | string \| number                                         | -      | 图片宽度                                     |
| height      | string \| number                                         | -      | 图片高度                                     |
| alt         | boolean                                                  | -      | 图片描述                                     |
| lazy        | boolean                                                  | false  | 是否懒加载                                   |
| shape       | 'rect' \| 'radius' \| 'round' \| 'circle'                | 'rect' | 图片形状                                     |
| fit         | 'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale-down' | 'fill' | 图片填充模式                                 |
| preview     | boolean                                                  | false  | 是否支持图片预览                             |
| onLoad      | (event: React.SyntheticEvent<HTMLImageElement>) => void  | -      | 加载时触发的回调函数                         |
| onError     | (event: React.SyntheticEvent<HTMLImageElement>) => void  | -      | 加载出错时触发的回调函数                     |

## CSS 变量

| 属性         | 默认值                 | 说明         |
| :----------- | :--------------------- | :----------- |
| --background | '#fafafa'              | 占位背景     |
| --text-color | 'var(--za-color-text)' | 占位字体颜色 |
| --font-size  | '12px'                 | 占位字体大小 |
| --radius     | 'var(--za-radius-lg)'  | 图片圆角大小 |
| --width      | -                      | 图片宽度     |
| --height     | -                      | 图片高度     |
