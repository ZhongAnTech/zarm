# Panel 面板

## 基本用法

```jsx
import { Panel } from 'zarm';

ReactDOM.render(
  <Panel
    title="基本用法"
    more={
      <a href="#" onClick={() => alert('click more')}>
        更多
      </a>
    }
  >
    <div className="box">内容</div>
  </Panel>,
  mountNode,
);
```

## 左右留白

```jsx
import { Panel } from 'zarm';

ReactDOM.render(
  <Panel spacing title="左右留白">
    <div className="box">内容</div>
  </Panel>,
  mountNode,
);
```

## API

| 属性  | 类型      | 默认值 | 说明     |
| :---- | :-------- | :----- | :------- |
| title | ReactNode | -      | 标题渲染 |
| more  | ReactNode | -      | 更多渲染 |
