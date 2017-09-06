# 复选框 Checkbox

[demo页面](https://zhongantecheng.github.io/zarm/#/checkbox)

### 引入

```js
import { Checkbox } from 'zarm';
```

### 代码演示

#### 基本用法

###### 单独使用
```jsx
<Checkbox onChange={checked => console.log(`checkbox to ${checked}`)}>同意条款</Checkbox>
```

###### 组合使用
```jsx
<Checkbox.Group
  value={this.state.value}
  onChange={value => {
    this.setState({
      value,
    })
  }}>
  <Checkbox value="0">选项一</Checkbox>
  <Checkbox value="1">选项二</Checkbox>
  <Checkbox value="2">选项三</Checkbox>
</Checkbox.Group>
```

#### 按钮样式

###### 普通
```jsx
<Checkbox.Group type="button">
  <Checkbox value="0">选项一</Checkbox>
  <Checkbox value="1">选项二</Checkbox>
  <Checkbox value="2">选项三</Checkbox>
</Checkbox.Group>
```

###### 指定默认值
```jsx
<Checkbox.Group type="button" defaultValue={['0', '1']}>
  <Checkbox value="0">选项一</Checkbox>
  <Checkbox value="1">选项二</Checkbox>
  <Checkbox value="2">选项三</Checkbox>
</Checkbox.Group>
```

###### 禁用指定项
```jsx
<Checkbox.Group type="button">
  <Checkbox value="0">选项一</Checkbox>
  <Checkbox value="1">选项二</Checkbox>
  <Checkbox value="2" disabled>选项三</Checkbox>
</Checkbox.Group>
```

###### 圆角
```jsx
<Checkbox.Group type="button" shape="radius">
  <Checkbox value="0">选项一</Checkbox>
  <Checkbox value="1">选项二</Checkbox>
  <Checkbox value="2">选项三</Checkbox>
</Checkbox.Group>
```

###### 椭圆角
```jsx
<Checkbox.Group type="button" shape="round">
  <Checkbox value="0">选项一</Checkbox>
  <Checkbox value="1">选项二</Checkbox>
  <Checkbox value="2">选项三</Checkbox>
</Checkbox.Group>
```

#### 块级样式
```jsx
<Checkbox.Group block type="button">
  <Checkbox value="0">选项一</Checkbox>
  <Checkbox value="1">选项二</Checkbox>
  <Checkbox value="2">选项三</Checkbox>
</Checkbox.Group>
```

#### 列表样式

###### 普通
```jsx
<Checkbox.Group type="cell">
  <Checkbox value="0">选项一</Checkbox>
  <Checkbox value="1">选项二</Checkbox>
  <Checkbox value="2" disabled>选项三（禁止选择）</Checkbox>
</Checkbox.Group>
```

###### 禁用状态
```jsx
<Checkbox.Group disabled type="cell">
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
| className | string | | | 追加类名 |
| theme | string | 'primary' | 'default', 'primary', 'info', 'success', 'warning', 'error' | 主题 |
| type | string | | 'button', 'cell' | 显示类型 |
| value | string, number | | | 值 |
| checked | bool | | | 是否选中 |
| defaultChecked | bool | | | 初始是否选中 |
| disabled | bool | false | | 是否禁用 |
| onChange | func | | \(checked: bool\) | 值变化时触发的回调函数 |

#### Checkbox.Group

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-checkbox | | 类名前缀 |
| className | string | | | 追加类名 |
| theme | string | 'primary' | 'default', 'primary', 'info', 'success', 'warning', 'error' | 主题 |
| shape | string | | 'radius', 'round' | 形状 |
| type | string | | 'button', 'cell' | 显示类型 |
| value | array | [ ] | | 选中值 |
| defaultValue | array | [ ] | | 初始选中值 |
| block | bool | false | | 是否为块级元素 |
| disabled | bool | false | | 是否禁用 |
| onChange | func | noop | \(value: array\) | 值变化时触发的回调函数 |



