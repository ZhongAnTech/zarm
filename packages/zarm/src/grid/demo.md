# Grid 宫格

## 基本用法

```tsx
import { Grid } from 'zarm';

ReactDOM.render(
  <Grid>
    {Array.from(Array(6).keys()).map((_, i) => (
      <Grid.Item key={i}>
        <div className="block">内容{i + 1}</div>
      </Grid.Item>
    ))}
  </Grid>,
  mountNode,
);
```

## 可点击的

```tsx
import { Grid } from 'zarm';

ReactDOM.render(
  <Grid>
    {Array.from(Array(6).keys()).map((_, i) => (
      <Grid.Item key={i} onClick={() => console.log(i)}>
        <div className="block">内容{i + 1}</div>
      </Grid.Item>
    ))}
  </Grid>,
  mountNode,
);
```

## 自定义列数

```tsx
import { Grid } from 'zarm';

const Demo = () => {
  return (
    <Grid columns={4}>
      {Array.from(Array(6).keys()).map((_, i) => (
        <Grid.Item key={i}>
          <div className="block">内容{i + 1}</div>
        </Grid.Item>
      ))}
    </Grid>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 自定义间距

```tsx
import { Grid } from 'zarm';

const Demo = () => {
  return (
    <Grid gutter={[10, 16]}>
      {Array.from(Array(6).keys()).map((_, i) => (
        <Grid.Item key={i}>
          <div className="block">内容{i + 1}</div>
        </Grid.Item>
      ))}
    </Grid>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 正方形格子

```tsx
import { Grid } from 'zarm';

const Demo = () => {
  return (
    <Grid square>
      {Array.from(Array(6).keys()).map((_, i) => (
        <Grid.Item key={i}>
          <div className="block">内容{i + 1}</div>
        </Grid.Item>
      ))}
    </Grid>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性     | 类型               | 默认值 | 说明                                                 |
| :------- | :----------------- | :----- | :--------------------------------------------------- |
| columns  | number             | 3      | 列数                                                 |
| gutter   | number \| number[] | 0      | 格子之间的间距，数组类型时表示：[上下间距, 左右间距] |
| bordered | boolean            | true   | 是否显示边框                                         |
| square   | boolean            | false  | 是否将格子固定为正方形 (设置正方形会导致间距失效)    |

## CSS 变量

| 属性                             | 类型                               | 默认值                        | 说明                 |
| :------------------------------- | :--------------------------------- | :---------------------------- | :------------------- |
| --za-grid-border-color           | React.CSSProperties['borderColor'] | 'var(--za-border-color)'      | 格子边框颜色         |
| --za-grid-item-background        | React.CSSProperties['background']  | 'var(--za-background-color)'  | 格子背景颜色         |
| --za-grid-item-active-background | React.CSSProperties['background']  | 'var(--za-background-active)' | 格子点击反馈背景颜色 |
