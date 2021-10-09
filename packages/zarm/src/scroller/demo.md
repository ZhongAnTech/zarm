# Scroller 滚动

## 基本用法

```jsx
import { useRef, useState } from 'react';
import { Scroller, List, Message } from 'zarm';
import { WarningCircle } from '@zarm-design/icons';

const Demo = () => {
  const list = [];
  for (let i = 0; i < 100; i++) list.push(<List.Item key={+i} title={`第 ${i + 1} 行`} />);

  const containerRef = useRef();
  const [scrollTop, setScrollTop] = useState(0);

  return (
    <>
      <Message theme="warning" icon={<WarningCircle />}>
        当前 scrollTop：{scrollTop}
      </Message>
      <Scroller container={() => containerRef.current} onScroll={setScrollTop}>
        <div
          ref={containerRef}
          style={{
            overflowY: 'auto',
            maxHeight: 400,
          }}
        >
          <List>{list}</List>
        </div>
      </Scroller>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性      | 类型                               | 默认值 | 说明                 |
| :-------- | :--------------------------------- | :----- | :------------------- |
| container | HTMLElement \| (() => HTMLElement) | window | 设置滚动容器         |
| onScroll  | (scrollTop?: number) => void       | -      | 滚动时触发的回调函数 |
