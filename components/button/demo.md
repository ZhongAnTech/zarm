## 按钮 Button

:::demo 基本用法
```jsx
import { Button } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Button>default</Button>
        <Button theme="primary">primary</Button>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 块级按钮
```jsx
import { Button } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Button block>default</Button>
        <Button block disabled>default disabled</Button>
        <Button block theme="primary">primary</Button>
        <Button block disabled theme="primary">primary disabled</Button>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 幽灵按钮
```jsx
import { Button } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Button block ghost theme="primary">primary ghost</Button>
        <Button block ghost disabled theme="primary">primary ghost disabled</Button>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 按钮主题
```jsx
import { Button } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Button theme="default">default</Button>
        <Button theme="primary">primary</Button>
        <Button theme="success">success</Button>
        <Button theme="warning">warning</Button>
        <Button theme="error">error</Button>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 按钮尺寸
```jsx
import { Button } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Button size="lg">lg</Button>
        <Button>md</Button>
        <Button size="sm">sm</Button>
        <Button size="xs">xs</Button>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 按钮形状
```jsx
import { Button, Icon } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Button shape="rect" theme="primary">rect</Button>
        <Button shape="radius" theme="primary">radius</Button>
        <Button shape="round" theme="primary">round</Button>
        <Button shape="circle" theme="primary">circle</Button>
        <Button ghost shape="circle" icon={<Icon type="right" />} />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 图标按钮
```jsx
import { Button, Icon } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Button shape="radius" icon={<Icon type="right-round" theme="success" />}>正确</Button>
        <Button shape="radius" icon={<Icon type="wrong-round" theme="error" />}>错误</Button>
        <Button loading shape="radius">加载中</Button>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::



:::api API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| theme | string | `default` | `default`, `primary`, `success`, `warning`, `error` | 主题 |
| size | string | | `md`, `lg`, `sm`, `xs` | 大小 |
| shape | string | 'rect' | `rect`, `radius`, `round`, `circle` | 形状 |
| block | boolean | false | | 是否块级元素 |
| ghost | boolean | false | | 是否幽灵按钮 |
| disabled | boolean | false | | 是否禁用 |
| loading | boolean | false | | 是否加载中状态 |
| icon | ReactNode | | | 图标 |
| onClick | MouseEventHandler<HTMLAnchorElement> | | | 点击后触发的回调函数 |

:::
