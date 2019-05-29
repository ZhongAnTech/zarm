# ActivityIndicator 活动指示器

## 基本用法

```jsx
import { Cell, ActivityIndicator } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Cell description={<ActivityIndicator loading={false} />}>普通</Cell>
        <Cell description={<ActivityIndicator percent={40} />}>旋转动画</Cell>
        <Cell description={<ActivityIndicator size="lg" loading={false} />}>大号</Cell>
        <Cell description={<ActivityIndicator type="spinner" />}>Spinner</Cell>
        <Cell description={<ActivityIndicator type="spinner" size="lg" />}>大号Spinner</Cell>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```


## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| type | string | 'circular' | ，可选值 `circular` 圆环形状、`spinner` 传统菊花形状|
| loading | boolean | ture | 是否执行动画 |
| strokeWidth | number | 5 | 指示器边框的宽度 |  
| percent | number | 20 | 初始百分比 |
| size | string | 'md' | 大小，可选值 `md`、`lg` |
