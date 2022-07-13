# useInViewport 进入 Viewport 检测

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
    console.log(intersectionRatio);
  }, [inViewport]);

  return (
    <div>
      <div style={{ height: '1000px', backgroundColor: '#ccc' }}>很长的一个内容</div>
      <div ref={divRef}>in viewport</div>
    </div>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性 | 类型                            | 默认值 | 说明     |
| :--- | :------------------------------ | :----- | :------- |
| ref  | MutableRefObject\<HTMLElement\> | -      | 目标元素 |
