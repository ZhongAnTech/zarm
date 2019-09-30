# Checkbox 复选框



## 基本用法
```jsx
import { Cell, Checkbox } from 'zarm';

ReactDOM.render(
  <>
    <Cell><Checkbox>普通</Checkbox></Cell>
    <Cell><Checkbox defaultChecked>默认选中</Checkbox></Cell>
    <Cell><Checkbox disabled>禁用</Checkbox></Cell>
    <Cell><Checkbox defaultChecked disabled>选中且禁用</Checkbox></Cell>
    <Cell className="agreement-box">
      <Checkbox id="agreement" />
      <label htmlFor="agreement">阅读并同意<a href="/#" onClick={(e) => { e.preventDefault(); alert('agree it'); }}>《XXX条款》</a>中的相关规定</label>
    </Cell>
  </>
, mountNode);
```



## 按钮样式
```jsx
import { Cell, Checkbox } from 'zarm';

class Demo extends React.Component {
  state = {
    value: [],
  }

  render() {
    const { value } = this.state;

    return (
      <div>
        <Cell
          description={
            <Checkbox.Group
              type="button"
              value={this.state.value}
              onChange={(value) => {
                this.setState({ value });
                console.log(`radio to ${value}`)
              }}>
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
            <Checkbox.Group type="button" shape="rect">
              <Checkbox value="0">选项一</Checkbox>
              <Checkbox value="1">选项二</Checkbox>
              <Checkbox value="2">选项三</Checkbox>
            </Checkbox.Group>
          }
        >
          直角
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



## 块级样式
```jsx
import { Checkbox } from 'zarm';

ReactDOM.render(
  <div className="block-box">
    <Checkbox.Group block type="button">
      <Checkbox value="0">选项一</Checkbox>
      <Checkbox value="1">选项二</Checkbox>
      <Checkbox value="2">选项三</Checkbox>
    </Checkbox.Group>
  </div>
, mountNode);
```



## 列表样式
```jsx
import { Checkbox } from 'zarm';

ReactDOM.render(
  <Checkbox.Group type="cell">
    <Checkbox value="0">选项一</Checkbox>
    <Checkbox value="1">选项二</Checkbox>
    <Checkbox value="2" disabled>选项三（禁止选择）</Checkbox>
  </Checkbox.Group>
, mountNode);
```



## 列表样式禁用状态
```jsx
import { Checkbox } from 'zarm';

ReactDOM.render(
  <Checkbox.Group disabled type="cell">
    <Checkbox value="0">选项一</Checkbox>
    <Checkbox value="1">选项二</Checkbox>
    <Checkbox value="2">选项三</Checkbox>
  </Checkbox.Group>
, mountNode);
```



## API

### Checkbox
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| type | string | - | 显示类型，可选值 `button`, `cell` |
| value | string &#124; number | - | 值 |
| checked | boolean | - | 当前是否选中 |
| shape | string | 'radius' | 形状，可选值 `rect`, `radius`, `round` | 
| defaultChecked | boolean | - | 初始是否选中 |
| disabled | boolean | false | 是否禁用 |
| onChange | (checked?: boolean) => void | - | 值变化时触发的回调函数 |
| id | string | - | 方便外部带有for属性的label标签控制当前checkbox |

### Checkbox.Group
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| type | string | - | 显示类型，可选值 `button`, `cell` |
| value | number[] \| string[] | [] | 选中值 |
| defaultValue | number[] \| string[] | [] | 初始选中值 |
| shape | string | 'radius' | 形状，可选值 `rect`, `radius`, `round` | 
| block | boolean | false | 是否为块级元素 |
| disabled | boolean | false | 是否禁用 |
| onChange | (values?: number[] \| string[]) => void | - | 值变化时触发的回调函数 |
