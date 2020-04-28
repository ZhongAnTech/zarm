
# BackToTop 返回顶部



## 基本用法
```jsx
import { useRef, useState } from 'react';
import { Cell, BackToTop, Message, Button, Icon } from 'zarm';

const Demo = () => {
  const containerRef = useRef();
  const [useWindowScroll, setUserWindowScroll] = useState(true);

  const list = [];
  for (let i = 0; i < 100; i++)
    list.push(<Cell key={+i}>第 {i + 1} 行</Cell>);

  const styles = {
    button: {
      position: 'fixed',
      bottom: 30,
      right: 30,
      width: 60,
      height: 60,
      lineHeight: '60px',
      textAlign: 'center',
      backgroundColor: '#fff',
      color: '#999',
      fontSize: 20,
      borderRadius: 30,
      opacity: 0.9,
      boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.3)',
      cursor: 'pointer',
    }
  };

  let scrollContainer;

  if (!useWindowScroll) {
    styles.container = {
      overflow: 'auto',
      maxHeight: 400,
    };
    styles.button.position = 'absolute';
    scrollContainer = () => containerRef.current;
  }

  return (
    <>
      <Message theme="warning" icon={<Icon type="warning-round" />}>
        当前使用的是 `{useWindowScroll ? 'window' : 'div' }` 作为滚动容器。
        <Button theme="primary" size="xs" onClick={() => setUserWindowScroll(!useWindowScroll)}>点击切换</Button>
      </Message>
      <div ref={containerRef} style={styles.container}>{list}</div>
      <BackToTop
        scrollContainer={scrollContainer}
        onClick={() => console.log('click back to top')}
      >
        <span style={styles.button}>Up</span>
      </BackToTop>
    </>
  )
};

ReactDOM.render(<Demo />, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| speed | number | 100 | 每10毫秒滑动的距离 |
| visibleDistance | number | 400 | 离滚动条顶部的可视距离 |
| scrollContainer | () => HTMLElement | () => document.body | 设置滚动容器 |
| onClick | (event?: MouseEvent&lt;HTMLDivElement&gt;) => void | - | 点击后触发的回调函数 |
