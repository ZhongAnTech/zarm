# ActivityIndicator 活动指示器

## 基本用法

```jsx
import { Cell, ActivityIndicator } from 'zarm';

ReactDOM.render(
  <>
    <Cell description={<ActivityIndicator />}>普通</Cell>
    <Cell description={<ActivityIndicator size="lg" />}>大号</Cell>
    <Cell description={<ActivityIndicator loading={false} />}>无旋转动画</Cell>
    <Cell description={<ActivityIndicator loading={false} percent={75} />}>指定百分比</Cell>
  </>
, mountNode);
```



## 传统菊花状

```jsx
import { Cell, ActivityIndicator } from 'zarm';

ReactDOM.render(
  <>
    <Cell description={<ActivityIndicator type="spinner" />}>普通</Cell>
    <Cell description={<ActivityIndicator type="spinner" size="lg" />}>大号</Cell>
  </>
, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| type | string | 'circular' | 可选值 `circular` 圆环状、`spinner` 传统菊花状 |
| loading | boolean | ture | 是否执行动画 |
| strokeWidth | number | 5 | 指示器线条宽度 |  
| percent | number | 20 | 填充百分比, 圆环状无动画状态下可用 |
| size | string | 'md' | 大小，可选值 `md`、`lg` |
