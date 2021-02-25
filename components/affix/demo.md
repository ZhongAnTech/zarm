# Affix 组件名



## 基本用法

```jsx
import { Affix, Button } from 'zarm';
const { useState } = React;

const repeat = (n) => {
  return new Array(n).fill('');
}

const Demo = () => {
  const [top, setTop] = useState(10);
  const [bottom, setBottom] = useState(10);

  return (
    <>
      <Affix offsetTop={top}>
        <Button theme="primary" onClick={() => setTop(top + 10)}>
          Affix top
        </Button>
      </Affix>
      <br />
      {repeat(50).map((e, i) => (
        <br key={i} />
      ))}
      <Affix offsetBottom={bottom}>
        <Button theme="primary" onClick={() => setBottom(bottom + 10)}>
          Affix bottom
        </Button>
      </Affix>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 滚动容器
```jsx
import { useState } from 'react';
import { Affix, Button } from 'zarm';

const Demo = () => {
  const [container, setContainer] = useState(null);

  return (
    <div
      className="scrollable-container"
      ref={setContainer}
    >
      <div className="background">
        <Affix scrollContainer={() => container}>
          <Button theme="primary">根据滚动容器顶部固定</Button>
        </Affix>
      </div>
    </div>
  );
}

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| offsetTop | number | 0 | 距离窗口底部达到指定偏移量后触发 |
| offsetBottom | number | - | 距离窗口底部达到指定偏移量后触发 |
| scrollContainer | () => HTMLElement | () => window | 设置 `Affix` 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 |
| onChange | function(affixed) | - | 固定状态改变时触发的回调函数 |