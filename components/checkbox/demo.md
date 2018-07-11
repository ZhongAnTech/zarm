## 复选框 Checkbox

:::demo 基本用法
```jsx
import { Cell, Checkbox } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Cell><Checkbox>普通</Checkbox></Cell>
        <Cell><Checkbox defaultChecked>默认选中</Checkbox></Cell>
        <Cell><Checkbox disabled>禁用</Checkbox></Cell>
        <Cell><Checkbox defaultChecked disabled>选中且禁用</Checkbox></Cell>
        <Cell className="agreement-box">
          <Checkbox id="agreement" />
          <label htmlFor="agreement">阅读并同意<a href="/#" onClick={(e) => { e.preventDefault(); alert('agree it'); }}>《XXX条款》</a>中的相关规定</label>
        </Cell>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 按钮样式
```jsx
import { Cell, Checkbox } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Cell
          description={
            <Checkbox.Group type="button">
              <Checkbox value="0">选项一</Checkbox>
              <Checkbox value="1">选项二</Checkbox>
              <Checkbox value="2">选项三</Checkbox>
            </Checkbox.Group>
          }
        >
          普通
        </Cell>

        <Cell
          description={
            <Checkbox.Group type="button" defaultValue={['0', '1']}>
              <Checkbox value="0">选项一</Checkbox>
              <Checkbox value="1">选项二</Checkbox>
              <Checkbox value="2">选项三</Checkbox>
            </Checkbox.Group>
          }
        >
          指定默认值
        </Cell>

        <Cell
          description={
            <Checkbox.Group type="button">
              <Checkbox value="0">选项一</Checkbox>
              <Checkbox value="1">选项二</Checkbox>
              <Checkbox value="2" disabled>选项三</Checkbox>
            </Checkbox.Group>
          }
        >
          禁用指定项
        </Cell>

        <Cell
          description={
            <Checkbox.Group type="button" shape="radius">
              <Checkbox value="0">选项一</Checkbox>
              <Checkbox value="1">选项二</Checkbox>
              <Checkbox value="2">选项三</Checkbox>
            </Checkbox.Group>
          }
        >
          圆角
        </Cell>

        <Cell
          description={
            <Checkbox.Group type="button" shape="round">
              <Checkbox value="0">选项一</Checkbox>
              <Checkbox value="1">选项二</Checkbox>
              <Checkbox value="2">选项三</Checkbox>
            </Checkbox.Group>
          }
        >
          椭圆角
        </Cell>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 块级样式
```jsx
import { Checkbox } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div className="block-box">
        <Checkbox.Group block type="button">
          <Checkbox value="0">选项一</Checkbox>
          <Checkbox value="1">选项二</Checkbox>
          <Checkbox value="2">选项三</Checkbox>
        </Checkbox.Group>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 列表样式
```jsx
import { Checkbox } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Checkbox.Group type="cell">
          <Checkbox value="0">选项一</Checkbox>
          <Checkbox value="1">选项二</Checkbox>
          <Checkbox value="2" disabled>选项三（禁止选择）</Checkbox>
        </Checkbox.Group>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 列表样式禁用状态
```jsx
import { Checkbox } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Checkbox.Group disabled type="cell">
          <Checkbox value="0">选项一</Checkbox>
          <Checkbox value="1">选项二</Checkbox>
          <Checkbox value="2">选项三</Checkbox>
        </Checkbox.Group>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::api API

#### Checkbox
| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-checkbox | | 类名前缀 |
| className | string | | | 追加类名 |
| checked | boolean | | | 是否选中 |
| shape | string | | `radius`, `round` | 形状 |
| block | boolean | false | | 是否为块级元素 |
| type | string | | `button`, `cell` | 显示类型 |
| defaultChecked | boolean | | | 初始是否选中 |
| value | string &#124; number | | | 值 |
| disabled | boolean | false | | 是否禁用 |
| onChange | <code>(checked: boolean) => void</code> | | <code>\(checked: boolean\)</code> | 值变化时触发的回调函数 |
| id | string | | | 方便外部带有for属性的label标签控制当前checkbox |

#### Checkbox.Group
| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-checkbox | | 类名前缀 |
| className | string | | | 追加类名 |
| block | boolean | false | | 是否为块级元素 |
| shape | string | | `radius`, `round` | 形状 |
| value | Array&lt;number &#124; string&gt; | [ ] | | 选中值 |
| type | string | | `button`, `cell` | 显示类型 |
| defaultValue | Array&lt;number &#124; string&gt; | [ ] | | 初始选中值 |
| disabled | boolean | false | | 是否禁用 |
| onChange | <code>(value: Array&lt;number &#124; string&gt;) => void</code> | noop | \(value: Array&lt;number &#124; string&gt;\) | 值变化时触发的回调函数 |
| compact | boolean | false | | group内的checkbox（type="button"）是否无缝相连 |

:::