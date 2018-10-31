## 消息 Message



### 基本用法
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



### 可操作
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



### API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| theme | string | 'primary' | 主题，可选值 `default`、`primary`、`info`、`success`、`warning`、`error` |
| icon | ReactNode | - | 设置图标 |
| hasClosable | boolean | false | 是否显示关闭按钮 |
| hasArrow | boolean | false | 是否显示箭头 |
| onClick | () => void | - | 点击后触发的回调函数 |
