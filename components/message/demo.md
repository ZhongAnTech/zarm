## 消息 Message

:::demo 基本用法
```jsx
import { Message, Icon } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Message>普通</Message>
        <Message theme="error">自定义主题</Message>
        <Message icon={<Icon type="wrong-round" />}>自定义图标</Message>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 可操作
```jsx
import { Message } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Message hasArrow onClick={() => alert('click this message!')}>链接样式的</Message>
        <Message hasClosable>可关闭的</Message>
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
| prefixCls | string | za-message | | 类名前缀 |
| className | string | | | 追加类名 |
| theme | string | 'primary' | 'default', 'primary', 'info', 'success', 'warning', 'error' | 主题 |
| icon | any | | | 设置图标 |
| hasClosable | boolean | false | | 是否显示关闭按钮 |
| hasArrow | boolean | false | | 是否显示箭头 |
| onClick | <code>() => void</code> | noop | | 点击后触发的回调函数 |

:::