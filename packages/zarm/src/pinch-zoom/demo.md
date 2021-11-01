# PinchZoom

## 基本用法

```jsx
import { useState } from 'react';
import { PinchZoom, NoticeBar } from 'zarm';

function Demo() {
  return (
    <>
      <NoticeBar>图片缩放只支持Touch事件，建议使用移动模式/设备浏览以获得最佳体验。</NoticeBar>
      <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <PinchZoom>
          <img
            src="https://cdn-health.zhongan.com/magiccube/resource/s/hSE9buCehy.png"
            style={{ maxWidth: '100%' }}
          />
        </PinchZoom>
      </div>
    </>
  );
}

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性        | 类型                                          | 默认值 | 说明                         |
| :---------- | :-------------------------------------------- | :----- | :--------------------------- |
| minScale    | number                                        | 1      | 图片最小缩放比例，1 为最小值 |
| maxScale    | number                                        | 3      | 图片最大缩放比例             |
| onPinchZoom | (scale: number, x: number, y: number) => void |        | 缩放或者移动时触发           |
