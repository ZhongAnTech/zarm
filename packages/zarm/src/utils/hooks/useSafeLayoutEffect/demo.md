# useSafeLayoutEffect 安全布局副作用

兼容服务端渲染（SSR）场景的 React.useLayoutEffect。

## 基本用法

```jsx
import { useSafeLayoutEffect } from 'zarm';

const Demo = () => {
  useSafeLayoutEffect(() => {
    // ...doSomeThing
  }, []);

  return null;
};

ReactDOM.render(<Demo />, mountNode);
```

## API

同 React.useLayoutEffect
