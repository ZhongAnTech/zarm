## 导航栏 NavBar

:::demo 基本用法
```jsx
import { NavBar, Icon } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <NavBar
        left
        title="这是标题"
      />
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 左侧自定义
```jsx
import { NavBar, Icon } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <NavBar
        left={<Icon type="add" theme="success" />}
        title="这是标题"
      />
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 右侧渲染
```jsx
import { NavBar, Icon } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <NavBar
        left
        title="这是标题"
        right={<Icon type="info-round" theme="success" />}
      />
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 复数渲染
```jsx
import { NavBar, Icon } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <NavBar
        left
        title="这是标题"
        right={<div>
          <Icon type="question-round-fill" theme="success" />
          <Icon style={{ marginLeft: "16px" }} type="warning-round-fill" theme="success" />
        </div>}
      />
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::api API

| 属性 | 类型 | 必填 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | 否 | za-nav-bar | 类名前缀 |
| className | string | 否 | | 追加类名 |
| title | React.ReactNode | 否 | | 标题 |
| left | React.ReactNode | 否 | <Icon type="arrow-left" /> | 导航栏左侧渲染 |
| right | React.ReactNode | 否 | | 导航栏右侧渲染 |
| style | React.CSSProperties | 否 | | 自定义样式 |

:::
