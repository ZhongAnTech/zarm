# 消息 Message

[demo页面](https://zhongantecheng.github.io/zarm/#/message)

### 引入

```js
import { Message } from 'zarm';
```

### 代码演示

#### 基本用法

###### 普通
```jsx
<Message>消息内容</Message>
```

###### 设置主题
```jsx
<Message theme="warning">warning</Message>
```

###### 自定义图标
```jsx
<Message icon={<Icon type="wrong-round" />}>自定义图标</Message>
```

#### 可操作

###### 链接样式的
```jsx
<Message hasArrow onClick={() => alert('click this message!')}>链接样式的</Message>
```

###### 可关闭的
```jsx
<Message hasClosable>可关闭的</Message>
```

### API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-message | | 类名前缀 |
| className | string | | | 追加类名 |
| theme | string | 'primary' | 'default', 'primary', 'info', 'success', 'warning', 'error' | 主题 |
| icon | any | | | 设置图标 |
| hasClosable | boolean | false | | 是否显示关闭按钮 |
| hasArrow | boolean | false | | 是否显示箭头 |
| onClick | <code>() => void</code> | noop | | 点击后触发的回调函数 |





