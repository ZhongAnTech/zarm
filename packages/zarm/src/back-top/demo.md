# BackTop 返回顶部

## 基本用法

```jsx
import { useRef, useState } from 'react';
import { List, BackTop, Message, Button } from 'zarm';
import { WarningCircle } from '@zarm-design/icons';

const Demo = () => {
  const list = [];
  for (let i = 0; i < 100; i++) list.push(<List.Item key={+i} title={`第 ${i + 1} 行`} />);

  const containerRef = useRef();
  const [useWindowScroll, setUseWindowScroll] = useState(true);

  const container = !useWindowScroll ? () => containerRef.current : null;

  const containerStyle = !useWindowScroll
    ? {
        overflowY: 'auto',
        maxHeight: '400px',
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
      <BackTop
        scrollContainer={container}
        mountContainer={container}
        onClick={() => console.log('click back to top')}
      >
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
      </BackTop>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性            | 类型                                          | 默认值        | 说明                        |
| :-------------- | :-------------------------------------------- | :------------ | :-------------------------- |
| speed           | number                                        | 100           | 每 10 毫秒滑动的距离        |
| visibleDistance | number                                        | 400           | 离滚动条顶部的可视距离      |
| scrollContainer | HTMLElement \| (() => HTMLElement)            | window        | 设置滚动容器                |
| mountContainer  | HTMLElement \| (() => HTMLElement)            | document.body | 设置挂载容器                |
| duration        | number                                        | -             | 组件显示/隐藏的ƒ动画执行时间 |
| destroy         | boolean                                       | true          | 组件不可见时是否移除节点    |
| onClick         | (event: MouseEvent\<HTMLDivElement\>) => void | -             | 点击后触发的回调函数        |

## CSS 变量

| 属性     | 默认值 | 说明                             |
| :------- | :----- | :------------------------------- |
| --right  | '50px' | 返回顶部的按钮基于容器的右侧间距 |
| --bottom | '50px' | 返回顶部的按钮基于容器的底部间距 |
