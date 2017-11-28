# 模拟输入框 FakeInput

[demo页面](https://zhongantecheng.github.io/zarm/#/numkeyboard)

### 引入

```js
import { FakeInput } from 'zarm';
```

### 代码演示

#### 基本用法

```jsx
<Input placeholder="请输入手机号" value="13512341234" />
```

### API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-fakeinput | | 类名前缀 |
| className | string | | | 追加类名 |
| wrapStyle | object | {} | | 包裹容器的自定义设置 |
| inputStyle | object | {} | | 伪input的自定义设置 |
| value | string |  | | 值 |
| placeholder | string | '' | | placeholder |
| cbFocus | func | 无 | | 获取焦点的回调 |
| cbBlur | func | 无 | | 失去焦点的回调 |
