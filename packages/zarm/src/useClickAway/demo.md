# useClickAway 单击外部跟踪器

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

## 监听多个元素

```jsx
import { useRef, useState } from 'react';
import { useClickAway, List, Button } from 'zarm';

const Demo = () => {
  const ref1 = useRef();
  const ref2 = useRef();
  const [count, setCount] = useState(0);

  useClickAway([ref1, ref2], () => {
    setCount(count + 1);
    console.log('click away with multiple targets');
  });

  return (
    <List>
      <List.Item
        title={count}
        after={
          <>
            <Button ref={ref1} size="sm" style={{ marginRight: 10 }}>
              Button1
            </Button>
            <Button ref={ref2} size="sm">
              Button2
            </Button>
          </>
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
