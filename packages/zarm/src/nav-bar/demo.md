# NavBar 导航栏

## 左侧渲染

```jsx
import { NavBar } from 'zarm';
import { ArrowLeft } from '@zarm-design/icons';

ReactDOM.render(
  <NavBar
    left={<ArrowLeft theme="primary" onClick={() => window.history.back()} />}
    title="这是标题"
  />,
  mountNode,
);
```

## 右侧渲染

```jsx
import { NavBar } from 'zarm';
import { Plus } from '@zarm-design/icons';

ReactDOM.render(
  <NavBar
    title="这是标题"
    right={<Plus theme="primary" onClick={() => window.alert('click icon')} />}
  />,
  mountNode,
);
```

## 复数渲染

```jsx
import { NavBar, Icon } from 'zarm';
import { ArrowLeft, Search, Plus } from '@zarm-design/icons';

ReactDOM.render(
  <NavBar
    left={<ArrowLeft theme="primary" onClick={() => window.history.back()} />}
    title="这是标题"
    right={
      <>
        <Plus theme="primary" onClick={() => alert('click icon1')} style={{ marginRight: 16 }} />
        <Search theme="primary" onClick={() => alert('click icon2')} />
      </>
    }
  />,
  mountNode,
);
```

## API

| 属性  | 类型      | 默认值 | 说明           |
| :---- | :-------- | :----- | :------------- |
| title | ReactNode | -      | 标题渲染       |
| left  | ReactNode | -      | 导航栏左侧渲染 |
| right | ReactNode | -      | 导航栏右侧渲染 |

## CSS 变量

| 属性                 | 默认值                      | 说明           |
| :------------------- | :-------------------------- | :------------- |
| --background         | 'rgba(249, 249, 249, 0.94)' | 背景色         |
| --height             | '44px'                      | 高度           |
| --title-color        | 'var(--za-color-text)'      | 标题字体色     |
| --title-font-size    | 'var(--za-font-size-md)'    | 标题字体大小   |
| --title-font-weight  | '500'                       | 标题字体粗细   |
| --side-font-size     | 'var(--za-font-size-md)'    | 左右栏字体大小 |
| --padding-horizontal | '16px'                      | 横向内边距     |
