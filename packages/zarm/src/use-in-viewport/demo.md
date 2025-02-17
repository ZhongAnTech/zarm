# useInViewport 进入窗口检测

## 基本用法

```jsx
import { useEffect, useState, useRef } from 'react';
import { useInViewport } from 'zarm';

const Demo = () => {
  const divRef = useRef(null);
  const [inViewport] = useInViewport(divRef);

  useEffect(() => {
    if (inViewport) {
      alert('in viewport');
    }
  }, [inViewport]);

  return (
    <div>
      <div style={{ height: '1000px', backgroundColor: '#ccc', padding: '15px' }}>
        一个很长的内容
      </div>
      <div ref={divRef} style={{ padding: '15px' }}>
        检测对象
      </div>
    </div>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性 | 类型                            | 默认值 | 说明     |
| :--- | :------------------------------ | :----- | :------- |
| ref  | MutableRefObject\<HTMLElement\> | -      | 目标元素 |
