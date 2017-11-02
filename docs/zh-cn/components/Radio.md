# 单选框 Radio

[demo页面](https://zhongantecheng.github.io/zarm/#/radio)

### 引入

```js
import { Radio } from 'zarm';
```

### 代码演示

#### 基本用法

###### 单独使用
```jsx
<Radio value="ok" onChange={value => console.log(`radio to ${value}`)}>同意条款</Radio>
```

###### 组合使用
```jsx
<Radio.Group
  value={this.state.radio}
  onChange={value => console.log(`radio to ${value}`)}>
  <Radio value="0">选项一</Radio>
  <Radio value="1">选项二</Radio>
  <Radio value="2">选项三</Radio>
</Radio.Group>
```

#### 按钮样式

###### 普通
```jsx
<Radio.Group type="button">
  <Radio value="0">选项一</Radio>
  <Radio value="1">选项二</Radio>
  <Radio value="2">选项三</Radio>
</Radio.Group>
```

###### 指定默认值
```jsx
<Radio.Group type="button" defaultValue="1">
  <Radio value="0">选项一</Radio>
  <Radio value="1">选项二</Radio>
  <Radio value="2">选项三</Radio>
</Radio.Group>
```

###### 禁用指定项
```jsx
<Radio.Group type="button">
  <Radio value="0">选项一</Radio>
  <Radio value="1">选项二</Radio>
  <Radio value="2" disabled>选项三</Radio>
</Radio.Group>
```

###### 圆角
```jsx
<Radio.Group type="button" shape="radius">
  <Radio value="0">选项一</Radio>
  <Radio value="1">选项二</Radio>
  <Radio value="2">选项三</Radio>
</Radio.Group>
```

###### 椭圆角
```jsx
<Radio.Group type="button" shape="round">
  <Radio value="0">选项一</Radio>
  <Radio value="1">选项二</Radio>
  <Radio value="2">选项三</Radio>
</Radio.Group>
```

#### 块级样式
```jsx
<Radio.Group block compact shape="radius">
  <Radio value="0">选项一</Radio>
  <Radio value="1">选项二</Radio>
  <Radio value="2">选项三</Radio>
</Radio.Group>
```

#### 列表样式

###### 普通
```jsx
<Radio.Group type="cell">
  <Radio value="0">选项一</Radio>
  <Radio value="1">选项二</Radio>
  <Radio value="2" disabled>选项三（禁止选择）</Radio>
</Radio.Group>
```

###### 禁用状态
```jsx
<Radio.Group disabled type="cell">
  <Radio value="0">选项一</Radio>
  <Radio value="1">选项二</Radio>
  <Radio value="2">选项三</Radio>
</Radio.Group>
```


### API

#### Radio

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-radio | | 类名前缀 |
| className | string | | | 追加类名 |
| theme | string | 'primary' | 'default', 'primary', 'info', 'success', 'warning', 'error' | 主题 |
| type | string | | 'button', 'cell' | 显示类型 |
| value | string, number | | | 值 |
| checked | bool | | | 当前是否选中 |
| defaultChecked | bool | | | 初始是否选中 |
| disabled | bool | false | | 是否禁用 |
| onChange | func | | \(checked: bool\) | 值变化时触发的回调函数 |

#### Radio.Group

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-radio | | 类名前缀 |
| className | string | | | 追加类名 |
| theme | string | 'primary' | 'default', 'primary', 'info', 'success', 'warning', 'error' | 主题 |
| type | string | | 'button', 'cell' | 显示类型 |
| shape | string | | 'radius', 'round' | 形状 |
| value | string, number | | | 选中值 |
| defaultValue | string, number | | | 初始选中值 |
| block | bool | false | | 是否为块级元素 |
| disabled | bool | false | | 是否禁用 |
| compact | bool | false | | 是否启用紧凑模式 |
| onChange | func | noop | \(value: string, number\) | 值变化时触发的回调函数 |



