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

| 属性        | 类型    | 默认值     | 说明                                                       |
| :---------- | :------ | :--------- | :--------------------------------------------------------- |
| type        | string  | 'circular' | 指示器类型，可选值 `circular` 圆环状、`spinner` 传统菊花状 |
| size        | string  | -          | 指示器大小，可选值 `lg`                                    |
| loading     | boolean | ture       | 圆环指示器是否执行旋转动画                                 |
| strokeWidth | number  | 5          | 圆环指示器线条宽度                                         |
| percent     | number  | 20         | 圆环状无动画指示器填充百分比                               |

## CSS 变量

| 属性                                               | 类型                                     | 默认值                    | 说明                     |
| :------------------------------------------------- | :--------------------------------------- | :------------------------ | :----------------------- |
| --za-activity-indicator-size                       | React.CSSProperties['width' \| 'height'] | '22px'                    | 指示器大小               |
| --za-activity-indicator-size-large                 | React.CSSProperties['width' \| 'height'] | '29px'                    | 大型指示器大小           |
| --za-activity-indicator-stroke-color               | React.CSSProperties['stroke']            | '#e6e6e6'                 | 指示器轨道颜色           |
| --za-activity-indicator-stroke-active-color        | React.CSSProperties['stroke']            | 'var(--za-theme-primary)' | 指示器激活色             |
| --za-activity-indicator-spinner-item-color         | React.CSSProperties['color']             | '#80858e'                 | 菊花状指示器花瓣颜色     |
| --za-activity-indicator-spinner-item-width         | React.CSSProperties['width']             | '3px'                     | 菊花状指示器花瓣宽度     |
| --za-activity-indicator-spinner-item-height        | React.CSSProperties['height']            | '32%'                     | 菊花状指示器花瓣长度     |
| --za-activity-indicator-spinner-item-border-radius | React.CSSProperties['borderRadius']      | '1.5px'                   | 菊花状指示器花瓣圆角大小 |
