# useScroll 滚动

## 基本用法

```jsx
import { useRef, useState } from 'react';
import { useScroll, List, Message } from 'zarm';
import { WarningCircle } from '@zarm-design/icons';

const Demo = () => {
  const list = [];
  for (let i = 0; i < 100; i++) list.push(<List.Item key={+i} title={`第 ${i + 1} 行`} />);
  const [scrollTop, setScrollTop] = useState(0);

  const containerRef = useRef();

  useScroll({
    container: containerRef,
    onScroll: (e) => {
      setScrollTop(e.target.scrollTop);
    },
  });

  return (
    <>
      <Message theme="warning" icon={<WarningCircle />}>
        当前 scrollTop：{scrollTop}
      </Message>
      <div
        ref={containerRef}
        style={{
          overflowY: 'auto',
          maxHeight: 400,
        }}
      >
        <List>{list}</List>
      </div>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性      | 类型                     | 默认值 | 说明                 |
| :-------- | :----------------------- | :----- | :------------------- |
| container | RefObject                | null   | 设置滚动容器         |
| onScroll  | (e?: MouseEvent) => void | -      | 滚动时触发的回调函数 |
| wait      | number                   | 200ms  | 节流毫秒数           |
