# 开关 Switch

[demo页面](https://zhongantecheng.github.io/zarm/#/switch)

### 引入

```js
import { Switch } from 'zarm';
```

### 代码演示

#### 基本用法

###### 普通
```jsx
<Switch
  checked={this.state.value}
  onChange={(value) => {
    this.setState({ value });
  }}
  />
```

###### 设置默认值（开启）
```jsx
<Switch defaultChecked />
```

###### 禁用状态
```jsx
<Switch disabled />
```


### API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-switch | | 类名前缀 |
| className | string | | | 追加类名 |
| theme | string | 'primary' | 'default', 'primary', 'info', 'success', 'warning', 'error' | 主题 |
| checked | bool | | | 值 |
| defaultChecked | bool | | | 初始值 |
| disabled | bool | false | | 是否禁用 |
| onChange | func | | \(value: bool\) | 值变化时触发的回调函数 |




