# Affix 组件名

## 基本用法

```jsx
import { useState } from 'react';
import { Affix, List, Button, Switch } from 'zarm';

const Demo = () => {
  const [affixed, setAffixed] = useState(true);

  return (
    <>
      <List>
        <List.Item
          title="是否启用 Affix"
          after={<Switch checked={affixed} onChange={setAffixed} />}
        />
      </List>
      {affixed ? (
        <>
          <Affix offsetTop={20}>
            <Button theme="primary">Top</Button>
          </Affix>
          <div className="seperator" />
          <Affix offsetBottom={20}>
            <Button theme="primary">Bottom</Button>
          </Affix>
        </>
      ) : (
        <>
          <Button theme="primary">Top</Button>
          <div className="seperator" />
          <Button theme="primary">Bottom</Button>
        </>
      )}
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 滚动容器

```jsx
import { useRef } from 'react';
import { Affix, Button } from 'zarm';

const Demo = () => {
  const containerRef = useRef(null);

  return (
    <div className="scrollable-container" ref={containerRef}>
      <div className="background">
        <Affix scrollContainer={() => containerRef.current}>
          <Button theme="primary">根据滚动容器顶部固定</Button>
        </Affix>
      </div>
    </div>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性            | 类型                                         | 默认值 | 说明                                                                   |
| :-------------- | :------------------------------------------- | :----- | :--------------------------------------------------------------------- |
| offsetTop       | number                                       | -      | 距离窗口顶部达到指定偏移量后触发                                       |
| offsetBottom    | number                                       | -      | 距离窗口底部达到指定偏移量后触发                                       |
| scrollContainer | HTMLElement \| (() => HTMLElement) \| Window | window | 设置 `Affix` 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 |
| onChange        | (affixed: boolean) => void                   | -      | 固定状态改变时触发的回调函数                                           |
