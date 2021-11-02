# SwipeAction 滑动操作

## 基本用法

```jsx
import { SwipeAction, Button, List } from 'zarm';

ReactDOM.render(
  <List>
    <SwipeAction
      right={[
        <Button shape="rect" theme="primary" onClick={() => console.log('右按钮1')}>
          右按钮1
        </Button>,
        <Button shape="rect" theme="danger" onClick={() => console.log('右按钮2')}>
          右按钮2
        </Button>,
      ]}
    >
      <List.Item title="左滑看看" />
    </SwipeAction>

    <SwipeAction
      left={[
        <Button shape="rect" theme="primary" onClick={() => console.log('左按钮1')}>
          左按钮1
        </Button>,
        <Button shape="rect" theme="danger" onClick={() => console.log('左按钮2')}>
          左按钮2
        </Button>,
      ]}
    >
      <List.Item title="右滑看看" />
    </SwipeAction>

    <SwipeAction
      autoClose
      left={[
        <Button shape="rect" theme="primary" onClick={() => console.log('左按钮1')}>
          左按钮1
        </Button>,
        <Button shape="rect" theme="danger" onClick={() => console.log('左按钮2')}>
          左按钮2
        </Button>,
      ]}
      right={[
        <Button shape="rect" theme="danger" onClick={() => console.log('右按钮1')}>
          右按钮2
        </Button>,
      ]}
      onOpen={() => console.log('open')}
      onClose={() => console.log('close')}
    >
      <List.Item title="左右都能滑动（自动关闭）" />
    </SwipeAction>
  </List>,
  mountNode,
);
```

## API

| 属性              | 类型       | 默认值 | 说明                     |
| :---------------- | :--------- | :----- | :----------------------- |
| left              | object[]   | []     | 左侧按钮组               |
| right             | object[]   | []     | 右侧按钮组               |
| moveDistanceRatio | number     | 0.5    | 移动距离比例临界点       |
| moveTimeSpan      | number     | 300    | 移动时间跨度临界点       |
| animationDuration | number     | 300    | 动画执行时间，单位：毫秒 |
| offset            | number     | 10     | 回弹偏移的距离           |
| autoClose         | boolean    | true   | 点击按钮后是否自动关闭   |
| disabled          | boolean    | false  | 是否允许滑动             |
| onOpen            | () => void | -      | 滑开时触发的回调函数     |
| onClose           | () => void | -      | 关闭时触发的回调函数     |
