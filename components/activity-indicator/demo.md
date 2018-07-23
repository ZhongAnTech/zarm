## 活动指示器 ActivityIndicator

:::demo 基本用法
```jsx
import { Cell, ActivityIndicator } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Cell description={<ActivityIndicator />}>普通</Cell>
        <Cell description={<ActivityIndicator className="rotate360" />}>旋转动画</Cell>
        <Cell description={<ActivityIndicator size="lg" />}>大号</Cell>
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
| prefixCls | string | za-activity-indicator | | 类名前缀 |
| className | string | | | 追加类名 |
| strokeWidth | number | | | 指示器边框的宽度 |  
| percent | number | | | 初始百分比 |
| size | string | | 'lg' | 大小 |

:::