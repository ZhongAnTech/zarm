# 复选框 Checkbox

[demo页面](https://zhongantecheng.github.io/zarm/#/checkbox)

### 引入

```js
import { Checkbox } from 'zarm';
```

### 代码演示

#### 基本用法

单独使用

```jsx
<Checkbox onChange={checked => console.log(`checkbox to ${checked}`)}>同意条款</Checkbox>
```

组合使用

```jsx
<Checkbox.Group
  value={this.state.checkbox}
  onChange={value => console.log(`checkbox to ${value}`)}>
  <Checkbox value="0">选项一</Checkbox>
  <Checkbox value="1">选项二</Checkbox>
  <Checkbox value="2">选项三</Checkbox>
</Checkbox.Group>
```

#### 按钮样式

普通

```jsx
<Checkbox.Group
  type="button"
  value={this.state.checkbox}
  onChange={value => console.log(`checkbox to ${value}`)}>
  <Checkbox value="0">选项一</Checkbox>
  <Checkbox value="1">选项二</Checkbox>
  <Checkbox value="2">选项三</Checkbox>
</Checkbox.Group>
```

指定默认值

```jsx
<Checkbox.Group
  type="button"
  defaultValue={['0', '1']}
  onChange={value => console.log(`checkbox to ${value}`)}>
  <Checkbox value="0">选项一</Checkbox>
  <Checkbox value="1">选项二</Checkbox>
  <Checkbox value="2">选项三</Checkbox>
</Checkbox.Group>
```

禁用指定项

```jsx
<Checkbox.Group
  type="button"
  value={this.state.checkbox}
  onChange={value => console.log(`checkbox to ${value}`)}>
  <Checkbox value="0">选项一</Checkbox>
  <Checkbox value="1">选项二</Checkbox>
  <Checkbox value="2" disabled>选项三</Checkbox>
</Checkbox.Group>
```

圆角

```jsx
<Checkbox.Group
  type="button"
  shape="radius"
  value={this.state.checkbox}
  onChange={value => console.log(`checkbox to ${value}`)}>
  <Checkbox value="0">选项一</Checkbox>
  <Checkbox value="1">选项二</Checkbox>
  <Checkbox value="2">选项三</Checkbox>
</Checkbox.Group>
```

椭圆角

```jsx
<Checkbox.Group
  type="button"
  shape="round"
  value={this.state.checkbox}
  onChange={value => console.log(`checkbox to ${value}`)}>
  <Checkbox value="0">选项一</Checkbox>
  <Checkbox value="1">选项二</Checkbox>
  <Checkbox value="2">选项三</Checkbox>
</Checkbox.Group>
```

#### 列表样式

普通

```jsx
<Checkbox.Group
  type="cell"
  value={this.state.checkbox}
  onChange={value => console.log(`checkbox to ${value}`)}>
  <Checkbox value="0">选项一</Checkbox>
  <Checkbox value="1">选项二</Checkbox>
  <Checkbox value="2" disabled>选项三（禁止选择）</Checkbox>
</Checkbox.Group>
```

禁用状态

```jsx
<Checkbox.Group
  disabled
  type="cell"
  value={this.state.checkbox}
  onChange={value => console.log(`checkbox to ${value}`)}>
  <Checkbox value="0">选项一</Checkbox>
  <Checkbox value="1">选项二</Checkbox>
  <Checkbox value="2">选项三（禁止选择）</Checkbox>
</Checkbox.Group>
```


### API

#### Checkbox

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-checkbox | | 类名前缀 |
| className | string | 无 | | 追加类名 |
| theme | string | primary | 'default', 'primary', 'info', 'success', 'warning', 'error' | 主题 |
| type | string | 无 | 'button', 'cell' | 显示类型 |
| value | string, number | 无 | | 值 |
| defaultChecked | bool | false | | 初始是否选中 |
| checked | bool | false | | 当前是否选中 |
| disabled | bool | false | | 是否禁用 |
| onChange | func | noop | \(checked : bool\) | 值变化时触发的回调函数 |

#### Checkbox.Group

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-checkbox | | 类名前缀 |
| className | string | 无 | | 追加类名 |
| theme | string | primary | 'default', 'primary', 'info', 'success', 'warning', 'error' | 主题 |
| type | string | 无 | 'button', 'cell' | 显示类型 |
| shape | string | 无 | 'radius', 'round' | 形状 |
| block | bool | false | | 是否为块级元素 |
| disabled | bool | false | | 是否禁用 |
| compact | bool | false | | 是否启用紧凑模式 |
| onChange | func | noop | \(value: string, number\) | 值变化时触发的回调函数 |



