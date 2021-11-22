# Grid 宫格

## 基本用法

```tsx
import { Grid } from 'zarm';

const GridText = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8px 16px',
    }}
  >
    文本
  </div>
);

ReactDOM.render(
  <Grid>
    <Grid.Item>
      <GridText />
    </Grid.Item>
    <Grid.Item>
      <GridText />
    </Grid.Item>
    <Grid.Item>
      <GridText />
    </Grid.Item>
    <Grid.Item>
      <GridText />
    </Grid.Item>
  </Grid>,
  mountNode,
);
```

## 自定义列数

```tsx
import { Grid } from 'zarm';

const GridText = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8px 16px',
    }}
  >
    文本
  </div>
);

const Demo = () => {
  return (
    <Grid columns={3}>
      <Grid.Item>
        <GridText />
      </Grid.Item>
      <Grid.Item>
        <GridText />
      </Grid.Item>
      <Grid.Item>
        <GridText />
      </Grid.Item>
      <Grid.Item>
        <GridText />
      </Grid.Item>
      <Grid.Item>
        <GridText />
      </Grid.Item>
      <Grid.Item>
        <GridText />
      </Grid.Item>
    </Grid>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 正方形格子

```tsx
import { Grid } from 'zarm';

const GridText = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8px 16px',
    }}
  >
    文本
  </div>
);

const Demo = () => {
  return (
    <Grid columns={3} square>
      <Grid.Item>
        <GridText />
      </Grid.Item>
      <Grid.Item>
        <GridText />
      </Grid.Item>
      <Grid.Item>
        <GridText />
      </Grid.Item>
      <Grid.Item>
        <GridText />
      </Grid.Item>
      <Grid.Item>
        <GridText />
      </Grid.Item>
      <Grid.Item>
        <GridText />
      </Grid.Item>
    </Grid>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 格子间距

```tsx
import { Grid } from 'zarm';

const GridText = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8px 16px',
    }}
  >
    文本
  </div>
);

const Demo = () => {
  return (
    <Grid columns={3} gutter={10}>
      <Grid.Item>
        <GridText />
      </Grid.Item>
      <Grid.Item>
        <GridText />
      </Grid.Item>
      <Grid.Item>
        <GridText />
      </Grid.Item>
      <Grid.Item>
        <GridText />
      </Grid.Item>
      <Grid.Item>
        <GridText />
      </Grid.Item>
      <Grid.Item>
        <GridText />
      </Grid.Item>
    </Grid>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 自定义宫格样式

```tsx
import { Grid } from 'zarm';

const GridText = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8px 16px',
    }}
  >
    文本
  </div>
);

const Demo = () => {
  return (
    <Grid
      columns={3}
      style={{
        '--border-color': '#000',
        '--background-color': '#eee',
      }}
    >
      <Grid.Item>
        <GridText />
      </Grid.Item>
      <Grid.Item>
        <GridText />
      </Grid.Item>
      <Grid.Item>
        <GridText />
      </Grid.Item>
      <Grid.Item>
        <GridText />
      </Grid.Item>
      <Grid.Item>
        <GridText />
      </Grid.Item>
      <Grid.Item>
        <GridText />
      </Grid.Item>
    </Grid>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性     | 类型              | 默认值 | 说明                   |
| :------- | :---------------- | :----- | :--------------------- |
| columns  | number            | 0      | 列数                   |
| gutter   | number \|number[] | 0      | 格子之间的间距         |
| bordered | boolean           | true   | 是否显示边框           |
| square   | boolean           | false  | 是否将格子固定为正方形 |

## CSS 变量

| 属性               | 类型   | 默认值                     | 说明         |
| :----------------- | :----- | :------------------------- | :----------- |
| --border-color     | string | var(--za-border-color)     | 宫格边框颜色 |
| --background-color | string | var(--za-background-color) | 宫格背景颜色 |
