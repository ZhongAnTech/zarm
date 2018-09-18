## 滑动操作 SwipeAction

:::demo 基本用法
```jsx
import { SwipeAction, Button, Cell } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <SwipeAction
          right={[
            <Button size="lg" theme="primary" onClick={() => console.log('右按钮1')}>右按钮1</Button>,
            <Button size="lg" theme="error" onClick={() => console.log('右按钮2')}>右按钮2</Button>,
          ]}
        >
          <Cell>左滑看看</Cell>
        </SwipeAction>

        <SwipeAction
          left={[
            <Button size="lg" theme="primary" onClick={() => console.log('左按钮1')}>左按钮1</Button>,
            <Button size="lg" theme="error" onClick={() => console.log('左按钮2')}>左按钮2</Button>,
          ]}
        >
          <Cell>右滑看看</Cell>
        </SwipeAction>

        <SwipeAction
          autoClose
          left={[
            <Button size="lg" theme="primary" onClick={() => console.log('左按钮1')}>左按钮1</Button>,
            <Button size="lg" theme="warning" onClick={() => console.log('左按钮2')}>左按钮2</Button>,
          ]}
          right={[
            <Button size="lg" theme="error" onClick={() => console.log('右按钮1')}>右按钮2</Button>,
          ]}
          onOpen={() => console.log('open')}
          onClose={() => console.log('close')}
        >
          <Cell>左右都能滑动（自动关闭）</Cell>
        </SwipeAction>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::api API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-swipe-action | | 类名前缀 |
| className | string | | | 追加类名 |
| left | Array&lt;Object&gt; | [ ] | object: { theme, text, onClick } | 左侧按钮组 |
| right | Array&lt;Object&gt; | [ ] | object: { theme, text, onClick } | 右侧按钮组 |
| moveDistanceRatio | number | 0.5 | | 移动距离比例临界点 |
| moveTimeSpan | number | 300 | | 移动时间跨度临界点 |
| animationDuration | number | 300 | | 动画执行时间，单位：毫秒 |
| offset | number | 10 | | 回弹偏移的距离 |
| autoClose | boolean | | | 点击按钮后是否自动关闭 | 
| disabled | boolean | | | 是否允许滑动 |
| onOpen | <code>() => void</code> | noop | | 滑开时触发的回调函数 |
| onClose | <code>() => void</code> | noop | | 关闭时触发的回调函数 |

:::