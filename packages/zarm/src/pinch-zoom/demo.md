# PinchZoom

## 基本用法

```jsx
import { PinchZoom } from 'zarm';

ReactDOM.render(
  <>
    <PinchZoom>
      <img src="https://static.zhongan.com/website/health/zarm/images/banners/1.png" />
    </PinchZoom>
  </>,
  mountNode,
);
```

## API

| 属性        | 类型                                          | 默认值 | 说明                         |
| :---------- | :-------------------------------------------- | :----- | :--------------------------- |
| minScale    | number                                        | 1      | 图片最小缩放比例，1 为最小值 |
| maxScale    | number                                        | 3      | 图片最大缩放比例             |
| onPinchZoom | (scale: number, x: number, y: number) => void |        | 缩放或者移动时触发           |
