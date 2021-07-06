# useOrientation 屏幕方向

## 基本用法

```jsx
import { useOrientation, Message } from 'zarm';

let currentPoint = [0, 0];

const Demo = () => {
  const { type, angle } = useOrientation();
  console.log(type, angle);
  // 浏览器支持 window.screen.orientatio情况下根据type判断，否则根据angle判断 mobile angle === 0 默认为竖屏， pc端 angle === 0 为横屏
  return (
    <>
      {type ? (
        <Message>
          当前是：{type === 'portrait-primary' || type === 'portrait-secondary' ? '竖屏' : '横屏'}
        </Message>
      ) : (
        <Message>当前是：{angle === 0 || type === 180 ? '竖屏' : '横屏'}</Message>
      )}
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

### OrientationState

| 属性  | 类型   | 默认值           | 说明                                                                        |
| :---- | :----- | :--------------- | :-------------------------------------------------------------------------- |
| angle | number | 0                | 旋转角度                                                                    |
| type  | string | portrait-primary | [方向](https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation) |
