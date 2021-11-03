# BackToTop 返回顶部

## 基本用法

```jsx
import { useRef, useState } from 'react';
import { List, BackToTop, Message, Button } from 'zarm';
import { WarningCircle } from '@zarm-design/icons';

const Demo = () => {
  const list = [];
  for (let i = 0; i < 100; i++) list.push(<List.Item key={+i} title={`第 ${i + 1} 行`} />);

  const containerRef = useRef();
  const [useWindowScroll, setUseWindowScroll] = useState(true);

  const scrollContainer = !useWindowScroll ? () => containerRef.current : null;

  const containerStyle = !useWindowScroll
    ? {
        overflowY: 'auto',
        maxHeight: 400,
      }
    : {};

  return (
    <>
      <Message theme="warning" icon={<WarningCircle />}>
        当前使用的是 `{useWindowScroll ? 'window' : 'div'}` 作为滚动容器。
        <Button theme="primary" size="xs" onClick={() => setUseWindowScroll(!useWindowScroll)}>
          点击切换
        </Button>
      </Message>

      <List ref={containerRef} style={containerStyle}>
        {list}
      </List>

      <BackToTop scrollContainer={scrollContainer} onClick={() => console.log('click back to top')}>
        <div
          style={{
            width: 60,
            height: 60,
            lineHeight: '60px',
            textAlign: 'center',
            backgroundColor: '#fff',
            color: '#999',
            fontSize: 20,
            borderRadius: 30,
            boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.2)',
            cursor: 'pointer',
          }}
        >
          Up
        </div>
      </BackToTop>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性            | 类型                                          | 默认值 | 说明                   |
| :-------------- | :-------------------------------------------- | :----- | :--------------------- |
| speed           | number                                        | 100    | 每 10 毫秒滑动的距离   |
| visibleDistance | number                                        | 400    | 离滚动条顶部的可视距离 |
| scrollContainer | HTMLElement \| (() => HTMLElement)            | window | 设置滚动容器           |
| onClick         | (event: MouseEvent\<HTMLDivElement\>) => void | -      | 点击后触发的回调函数   |
