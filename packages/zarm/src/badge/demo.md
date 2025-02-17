# Badge 徽标

## 基本用法

```jsx
import { Badge, List } from 'zarm';

ReactDOM.render(
  <List>
    <List.Item title="点状" suffix={<Badge />} onClick={() => {}} />
    <List.Item title="直角" suffix={<Badge shape="rect" text="免费" />} onClick={() => {}} />
    <List.Item title="圆角" suffix={<Badge shape="radius" text="new" />} onClick={() => {}} />
    <List.Item title="椭圆角" suffix={<Badge shape="round" text="999+" />} onClick={() => {}} />
    <List.Item title="圆形" suffix={<Badge shape="circle" text={3} />} onClick={() => {}} />
    <List.Item title="叶形" suffix={<Badge shape="leaf" text="新品" />} onClick={() => {}} />
  </List>,
  mountNode,
);
```

## 上标位置

```jsx
import { Badge } from 'zarm';

ReactDOM.render(
  <div className="custom-panel">
    <div className="box">
      <Badge shape="dot">
        <div className="box-item" />
      </Badge>
    </div>
    <div className="box">
      <Badge shape="rect" text="免费">
        <div className="box-item" />
      </Badge>
    </div>
    <div className="box">
      <Badge shape="radius" text="new">
        <div className="box-item" />
      </Badge>
    </div>
    <div className="box">
      <Badge shape="round" text="999+">
        <div className="box-item" />
      </Badge>
    </div>
    <div className="box">
      <Badge shape="circle" text="3">
        <div className="box-item" />
      </Badge>
    </div>
    <div className="box">
      <Badge shape="leaf" text="新品">
        <div className="box-item" />
      </Badge>
    </div>
  </div>,
  mountNode,
);
```

## 带边框

```jsx
import { Badge } from 'zarm';

ReactDOM.render(
  <div className="custom-panel">
    <div className="box">
      <Badge bordered shape="dot">
        <div className="box-item" />
      </Badge>
    </div>
    <div className="box">
      <Badge bordered shape="round" text="免费">
        <div className="box-item" />
      </Badge>
    </div>
  </div>,
  mountNode,
);
```

## 自定义颜色和位置

```jsx
import { Badge } from 'zarm';

ReactDOM.render(
  <div className="custom-panel">
    <div className="box">
      <Badge style={{ '--color': '#00bc70' }}>
        <div className="box-item" />
      </Badge>
    </div>
    <div className="box">
      <Badge style={{ '--color': '#1890ff', '--top': '100%' }}>
        <div className="box-item" />
      </Badge>
    </div>
    <div className="box">
      <Badge style={{ '--color': '#fa541b', '--right': '100%' }}>
        <div className="box-item" />
      </Badge>
    </div>
    <div className="box">
      <Badge style={{ '--color': '#712fd1', '--top': '100%', '--right': '100%' }}>
        <div className="box-item" />
      </Badge>
    </div>
  </div>,
  mountNode,
);
```

## API

| 属性     | 类型      | 默认值 | 说明                                                                   |
| :------- | :-------- | :----- | :--------------------------------------------------------------------- |
| text     | ReactNode | -      | 设置显示的文字                                                         |
| shape    | string    | 'dot'  | 徽标形状，可选值为 `dot`、`rect` 、`radius`、`round`、`circle`、`leaf` |
| bordered | boolean   | false  | 是否带边框                                                             |

## CSS 变量

| 属性                 | 默认值                   | 说明                                   |
| :------------------- | :----------------------- | :------------------------------------- |
| --dot-size           | '8px'                    | 点状徽标大小                           |
| --color              | 'var(--za-theme-danger)' | 徽标背景色                             |
| --text-color         | '#fff'                   | 徽标文字颜色                           |
| --border-color       | '#fff'                   | 徽标边框色                             |
| --font-size          | '10px'                   | 徽标文字字体大小                       |
| --font-weight        | 600                      | 徽标文字字体粗细                       |
| --height             | '14px'                   | 徽标高度                               |
| --padding-horizontal | '4px'                    | 徽标左右内边距                         |
| --border-radius      | 'var(--za-radius-sm)'    | 徽标圆角大小                           |
| --top                | 0                        | 作为角标时，相对于最右边，向左的偏移量 |
| --right              | 0                        | 作为角标时，相对于最上边，向下的偏移量 |
