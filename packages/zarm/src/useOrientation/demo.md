# useOrientation 屏幕方向

## 基本用法

```jsx
import { useOrientation } from 'zarm';

let currentPoint = [0, 0];

const Demo = () => {
  const state = useOrientation();

  return <pre>{JSON.stringify(state, null, 2)}</pre>;
};

ReactDOM.render(<Demo />, mountNode);
```

## API

### OrientationState

| 属性  | 类型   | 默认值             | 说明     |
| :---- | :----- | :----------------- | :------- |
| angle | number | 0                  | 旋转角度 |
| type  | string | `portrait-primary` | 方向     |
