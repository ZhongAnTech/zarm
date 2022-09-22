# Panel 面板

## 基本用法

```jsx
import { Panel } from 'zarm';

ReactDOM.render(
  <Panel
    title="基本用法"
    more={
      <a href="#" onClick={() => alert('click more')}>
        更多
      </a>
    }
  >
    <div className="box">内容</div>
  </Panel>,
  mountNode,
);
```

## 左右留白

```jsx
import { Panel } from 'zarm';

ReactDOM.render(
  <Panel spacing title="左右留白">
    <div className="box">内容</div>
  </Panel>,
  mountNode,
);
```

## API

| 属性  | 类型      | 默认值 | 说明     |
| :---- | :-------- | :----- | :------- |
| title | ReactNode | -      | 标题渲染 |
| more  | ReactNode | -      | 更多渲染 |

## CSS 变量

| 属性                         | 默认值                   | 说明         |
| :--------------------------- | :----------------------- | :----------- |
| --header-padding             | '25px 16px 10px 16px'    | 头部间距     |
| --header-font-size           | '13px'                   | 头部字体大小 |
| --header-color               | 'rgba(60, 60, 67, 0.6)'  | 头部字体颜色 |
| --body-background            | '#fff'                   | 内容背景颜色 |
| --body-font-size             | 'var(--za-font-size-md)' | 内容字体大小 |
| --body-color                 | 'var(--za-color-text)'   | 内容颜色     |
| --body-border-radius         | '10px'                   | 圆角         |
| --spacing-padding-horizontal | '16px'                   | 水平间距     |
