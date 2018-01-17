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
| theme | string | `primary` | `default`, `primary`, `info`, `success`, `warning`, `error` | 主题 |
| shape | string | | `radius`, `round` | 圆角或者椭圆角 | 
| type | string | | `button`, `cell` | 显示类型 |
| value | string &#124; number | | | 值 |
| checked | boolean | | | 当前是否选中 |
| defaultChecked | boolean | | | 初始是否选中 |
| disabled | boolean | false | | 是否禁用 |
| onChange | (checked: boolean) => void | | \(checked: boolean\) | 值变化时触发的回调函数 |

#### Radio.Group

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-radio | | 类名前缀 |
| className | string | | | 追加类名 |
| theme | string | `primary` | `default`, `primary`, `info`, `success`, `warning`, `error` | 主题 |
| type | string | | `button`, `cell` | 显示类型 |
| shape | string | | `radius`, `round` | 形状 |
| value | string &#124; number | | | 选中值 |
| defaultValue | string &#124; number | | | 初始选中值 |
| block | boolean | false | | 是否为块级元素 |
| disabled | boolean | false | | 是否禁用 |
| compact | boolean | false | | 是否启用紧凑模式 |
| onChange | <code>(value: number &#124; string) => void</code> | noop | \(value: string &#124; number\) | 值变化时触发的回调函数 |



