# skeleton 骨架屏

## 基本用法

```jsx
import { Skeleton } from 'zarm';

const Demo = () => {
  return (
    <div className="skeleton">
      <Skeleton />
    </div>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 形状

```jsx
import { Skeleton } from 'zarm';

const Demo = () => {
  return (
    <div className="skeleton">
      <Skeleton />
      <Skeleton shape="circle" style={{ '--margin': '12px 0' }} />
      <Skeleton shape="rect" style={{ '--height': '80px' }} />
    </div>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 动画

```jsx
import { Skeleton } from 'zarm';

const Demo = () => {
  return (
    <div className="skeleton">
      <Skeleton animated shape="circle" />
    </div>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 内置 Title Paragraph 组件

```jsx
import { Skeleton } from 'zarm';

const Demo = () => {
  return (
    <div className="skeleton">
      <Skeleton.Title animated />
      <Skeleton.Paragraph animated />
    </div>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

### Skeleton

| 属性     | 类型    | 默认值   | 说明                                             |
| :------- | :------ | :------- | :----------------------------------------------- |
| shape    | sting   | 'radius' | 骨架屏形状，可选值为 `radius`、`rect` 、`circle` |
| animated | boolean | false    | 是否有动画                                       |

### Skeleton.Title

| 属性     | 类型        | 默认值   | 说明                                  |
| :------- | :---------- | :------- | :------------------------------------ |
| shape    | sting       | 'radius' | 骨架屏形状，可选值为 `radius`、`rect` |
| animated | 同 Skeleton |

### Skeleton.Paragraph

| 属性      | 类型        | 默认值   | 说明                                  |
| :-------- | :---------- | :------- | :------------------------------------ |
| shape     | sting       | 'radius' | 骨架屏形状，可选值为 `radius`、`rect` |
| animated  | 同 Skeleton |
| lineCount | number      | 3        | 行数                                  |

## CSS 变量

### Skeleton

| 属性            | 默认值   | 说明 |
| :-------------- | :----- | :--- |
| --width         | -      | 宽度 |
| --height        | '18px' | 高度 |
| --border-radius | '2px'  | 圆角 |
| --margin        | '0'    | 边距 |

### Skeleton.Title

| 属性            | 默认值      | 说明 |
| :-------------- | :-------- | :-- |
| --width         | '45%'     | 宽度 |
| --height        | '32px'    | 高度 |
| --border-radius | '2px'     | 圆角 |
| --margin        | '16px 0'  | 边距 |
