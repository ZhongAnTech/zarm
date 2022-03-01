# useClickAway 元素外事件监听

## 基本用法

```jsx
import { useRef, useState } from 'react';
import { useClickAway, List, Button } from 'zarm';

const Demo = () => {
  const ref = useRef();
  const [count, setCount] = useState(0);

  useClickAway(ref, () => {
    setCount(count + 1);
    console.log('click away');
  });

  return (
    <List>
      <List.Item
        title={count}
        after={
          <Button ref={ref} size="sm">
            点我外面试试？
          </Button>
        }
      />
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性        | 类型                                                  | 默认值  | 说明               |
| :---------- | :---------------------------------------------------- | :------ | :----------------- |
| ref         | MutableRefObject\<HTMLElement\>                       | -       | 目标元素           |
| onClickAway | (event: React.TouchEvent \| React.MouseEvent) => void | -       | 外部区域触发的事件 |
| eventName   | string                                                | 'click' | 事件名称           |
