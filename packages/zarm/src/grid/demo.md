# Grid 宫格

## 基本用法

```tsx
import { Grid } from 'zarm';

ReactDOM.render(
  <Grid>
    {Array.from(Array(4).keys()).map((_, i) => (
      <Grid.Item key={i} onClick={() => console.log(i)}>
        <div className="block">文本</div>
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
    <Grid columns={3}>
      {Array.from(Array(6).keys()).map((_, i) => (
        <Grid.Item key={i} onClick={() => console.log(i)}>
          <div className="block">文本</div>
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
    <Grid columns={3} square>
      {Array.from(Array(6).keys()).map((_, i) => (
        <Grid.Item key={i} onClick={() => console.log(i)}>
          <div className="block">文本</div>
        </Grid.Item>
      ))}
    </Grid>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 格子间距

```tsx
import { Grid } from 'zarm';

const Demo = () => {
  return (
    <Grid columns={3} gutter={[10, 20]}>
      {Array.from(Array(6).keys()).map((_, i) => (
        <Grid.Item key={i} onClick={() => console.log(i)}>
          <div className="block">文本</div>
        </Grid.Item>
      ))}
    </Grid>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 自定义宫格样式

```tsx
import { Grid } from 'zarm';

const Demo = () => {
  return (
    <Grid
      columns={3}
      style={{
        '--border-color': '#000',
        '--background-color': '#eee',
        '--background-active-color': '#bbb',
      }}
    >
      {Array.from(Array(6).keys()).map((_, i) => (
        <Grid.Item key={i} onClick={() => console.log(i)}>
          <div className="block">文本</div>
        </Grid.Item>
      ))}
    </Grid>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性     | 类型              | 默认值 | 说明                                              |
| :------- | :---------------- | :----- | :------------------------------------------------ |
| columns  | number            | 0      | 列数                                              |
| gutter   | number \|number[] | 0      | 格子之间的间距                                    |
| bordered | boolean           | true   | 是否显示边框                                      |
| square   | boolean           | false  | 是否将格子固定为正方形 (设置正方形会导致间距失效) |

## CSS 变量

| 属性                      | 类型   | 默认值                      | 说明                 |
| :------------------------ | :----- | :-------------------------- | :------------------- |
| --border-color            | string | var(--za-border-color)      | 格子边框颜色         |
| --background-color        | string | var(--za-background-color)  | 格子背景颜色         |
| --background-active-color | string | var(--za-background-active) | 格子点击反馈背景颜色 |
