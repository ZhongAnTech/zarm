# ActivityIndicator 活动指示器

## 基本用法

```jsx
import { List, ActivityIndicator } from 'zarm';

ReactDOM.render(
  <List>
    <List.Item title="普通" after={<ActivityIndicator />} />
    <List.Item title="大号" after={<ActivityIndicator size="lg" />} />
    <List.Item title="无旋转动画" after={<ActivityIndicator loading={false} />} />
    <List.Item title="指定百分比" after={<ActivityIndicator loading={false} percent={75} />} />
  </List>,
  mountNode,
);
```

## 传统菊花状

```jsx
import { List, ActivityIndicator } from 'zarm';

ReactDOM.render(
  <List>
    <List.Item title="普通" after={<ActivityIndicator type="spinner" />} />
    <List.Item title="大号" after={<ActivityIndicator type="spinner" size="lg" />} />
  </List>,
  mountNode,
);
```

## API

| 属性        | 类型    | 默认值     | 说明                                           |
| :---------- | :------ | :--------- | :--------------------------------------------- |
| type        | string  | 'circular' | 可选值 `circular` 圆环状、`spinner` 传统菊花状 |
| loading     | boolean | ture       | 是否执行动画                                   |
| strokeWidth | number  | 5          | 指示器线条宽度                                 |
| percent     | number  | 20         | 填充百分比, 圆环状无动画状态下可用             |
| size        | string  | 'md'       | 大小，可选值 `md`、`lg`                        |
