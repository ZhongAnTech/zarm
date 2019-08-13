# Radio 单选框



## 基本用法
```jsx
import { Radio, Cell } from 'zarm';

ReactDOM.render(
  <>
    <Cell><Radio>普通</Radio></Cell>
    <Cell><Radio defaultChecked>默认选中</Radio></Cell>
    <Cell><Radio disabled>禁用</Radio></Cell>
    <Cell><Radio defaultChecked disabled>选中且禁用</Radio></Cell>
  </>
, mountNode);
```



## 按钮样式
```jsx
import { Radio, Cell } from 'zarm';

class Demo extends React.Component {
  state = {
    radio: '0',
  };

  render() {
    return (
      <>
        <Cell
          description={
            <Radio.Group
              type="button"
              value={this.state.radio}
              onChange={value => {
                this.setState({ radio: value });
                console.log(`radio to ${value}`)
              }}
            >
              <Radio value="0">选项一</Radio>
              <Radio value="1">选项二</Radio>
              <Radio value="2">选项三</Radio>
            </Radio.Group>
          }
        >
          普通
        </Cell>

        <Cell
          description={
            <Radio.Group type="button" defaultValue="1">
              <Radio value="0">选项一</Radio>
              <Radio value="1">选项二</Radio>
              <Radio value="2">选项三</Radio>
            </Radio.Group>
          }
        >
          指定默认值
        </Cell>

        <Cell
          description={
            <Radio.Group type="button">
              <Radio value="0">选项一</Radio>
              <Radio value="1">选项二</Radio>
              <Radio value="2" disabled>选项三</Radio>
            </Radio.Group>
          }
        >
          禁用指定项
        </Cell>

        <Cell
          description={
            <Radio.Group type="button" shape="rect">
              <Radio value="0">选项一</Radio>
              <Radio value="1">选项二</Radio>
              <Radio value="2">选项三</Radio>
            </Radio.Group>
          }
        >
          直角
        </Cell>

        <Cell
          description={
            <Radio.Group type="button" shape="round">
              <Radio value="0">选项一</Radio>
              <Radio value="1">选项二</Radio>
              <Radio value="2">选项三</Radio>
            </Radio.Group>
          }
        >
          椭圆角
        </Cell>
      </>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 块级样式
```jsx
import { Radio } from 'zarm';

ReactDOM.render(
  <div className="block-box">
    <Radio.Group block type="button" shape="radius">
      <Radio value="0">选项一</Radio>
      <Radio value="1">选项二</Radio>
      <Radio value="2">选项三</Radio>
    </Radio.Group>
  </div>
, mountNode);
```



## 列表样式
```jsx
import { Radio } from 'zarm';

ReactDOM.render(
  <Radio.Group type="cell">
    <Radio value="0">选项一</Radio>
    <Radio value="1">选项二</Radio>
    <Radio value="2" disabled>选项三（禁止选择）</Radio>
  </Radio.Group>
, mountNode);
```



## 列表样式禁用状态
```jsx
import { Radio } from 'zarm';

ReactDOM.render(
  <Radio.Group disabled type="cell">
    <Radio value="0">选项一</Radio>
    <Radio value="1">选项二</Radio>
    <Radio value="2">选项三</Radio>
  </Radio.Group>
, mountNode);
```



## API

### Radio
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| type | string | - | 显示类型，可选值 `button`, `cell` |
| value | string \| number | - | 值 |
| checked | boolean | - | 当前是否选中 |
| shape | string | 'radius' | 形状，可选值 `rect`, `radius`, `round` | 
| defaultChecked | boolean | - | 初始是否选中 |
| disabled | boolean | false | 是否禁用 |
| onChange | (checked?: boolean) => void | - | 值变化时触发的回调函数 |

### Radio.Group
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| type | string | - | 显示类型，可选值 `button`, `cell` |
| value | string \| number | - | 选中值 |
| defaultValue | string \| number | - | 初始选中值 |
| shape | string | 'radius' | 形状，可选值 `rect`, `radius`, `round` | 
| block | boolean | false | 是否为块级元素 |
| disabled | boolean | false | 是否禁用 |
| onChange | (value?: string \| number) => void | - | 值变化时触发的回调函数 |
