# skeleton 组件名

## 基本用法

```jsx
import { useState } from 'react';
import { Skeleton } from 'zarm';

const Demo = () => {
  const [value, setValue] = useState();

  return (
    <div className="skeleton">
      <Skeleton width={200} animated />
      <Skeleton shape="rect" animated width="50%" />
      <Skeleton shape="circle" animated width="80px" height="80px" />
    </div>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :----- | :--- |
