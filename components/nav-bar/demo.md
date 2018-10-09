## 导航栏 NavBar

:::demo 左侧渲染
```jsx
import { NavBar, Icon } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <NavBar
        left={<Icon
          type="arrow-left"
          theme="success"
          onClick={() => window.history.back()}
        />}
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
        title="这是标题这是标题这是标题"
        right={
          <Icon
            type="question-round"
            theme="success"
            onClick={() => window.history.go(1)}
          />
        }
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
        left={
          <Icon 
            type="arrow-left"
            theme="success"
            onClick={() => window.history.back()}
          />
        }
        title="这是标题"
        right={<div>
          <Icon type="add" theme="success" onClick={() => alert('click icon1')} />
          <Icon
            style={{ marginLeft: 16 }}
            type="question-round"
            theme="success"
            onClick={() => alert('click icon2')}
          />
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
| left | React.ReactNode | 否 | | 导航栏左侧渲染 |
| right | React.ReactNode | 否 | | 导航栏右侧渲染 |
| style | React.CSSProperties | 否 | | 自定义样式 |

:::
