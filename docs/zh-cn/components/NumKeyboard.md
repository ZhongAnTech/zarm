# 数字键盘 NumKeyboard

[demo页面](https://zhongantecheng.github.io/zarm/#/numkeyboard)

### 引入

```js
import { NumKeyboard } from 'zarm';
```


### 代码演示

#### 基本用法

##### 手机号码键盘
```jsx
<NumKeyboard type="tel"/>
```

##### 价格键盘
```jsx
<NumKeyboard type="price"/>
```

##### 身份证键盘
```jsx
<NumKeyboard type="id"/>
```

### API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-input | | 类名前缀 |
| className | string | | | 追加类名 |
| type | string | tel | | 键盘类型 |
| mask | bool | false | | 是否有蒙版 |
| btnTitle | string | 确定 | | 确定文案 |
| visible | bool | false | | 键盘是否可见 |
| keyCallback | func | | | 键盘数字按钮的回调 |
| doneCallback | func |  | | 键盘确定按钮的回调 |