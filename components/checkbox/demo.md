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
    <Cell>
      <div className="agreement-box">
        <Checkbox id="agreement" />
        <label htmlFor="agreement">阅读并同意<a href="/#" onClick={(e) => { e.preventDefault(); alert('agree it'); }}>《XXX条款》</a>中的相关规定</label>
      </div>
    </Cell>
  </>
, mountNode);
```



## 受控使用
```jsx
import { Cell, Checkbox, Modal } from 'zarm';

class Demo extends React.Component {
  state = {
    isChecked: false,
  }

  onChange = (e) => {
    if (!e.target.checked) {
      Modal.confirm({
        content: '是否要取消选择',
        cancelText: '不取消',
      }).then((res) => {
        if (res) {
          this.setState({
            isChecked: false,
          });
        }
      });
      return;
    }

    this.setState({
      isChecked: true,
    });
  }

  render() {
    const { isChecked } = this.state;

    return (
      <Cell>
        <Checkbox checked={isChecked} onChange={this.onChange}>取消勾选前确认</Checkbox>
      </Cell>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 组合使用
```jsx
import { Cell, Checkbox } from 'zarm';

class Demo extends React.Component {
  state = {
    value: [],
  }

  onCheckedAll = (e) => {
    this.setState({
      value: e.target.checked ? ['0', '1', '2'] : [],
    });
  }

  onChange = (value) => {
    console.log(value);
    this.setState({ value });
  }

  render() {
    const { value } = this.state;

    return (
      <>
        <Cell>
          <Checkbox
            checked={value.length === 3}
            indeterminate={value.length < 3 && value.length > 0}
            onChange={this.onCheckedAll}
          >
            全选 / 反选
          </Checkbox>
        </Cell>
        <Cell>
          <Checkbox.Group value={value} onChange={this.onChange}>
            <Checkbox value="0">选项一</Checkbox>
            <Checkbox value="1">选项二</Checkbox>
            <Checkbox value="2">选项三</Checkbox>
          </Checkbox.Group>
        </Cell>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
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
                this.setState({ value }, () => console.log(`checked to ${value}`));
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
              <Checkbox value="1" disabled>选项二</Checkbox>
              <Checkbox value="2" disabled checked>选项三</Checkbox>
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

        <Cell
          description={
            <Checkbox.Group ghost type="button" defaultValue={['2']}>
              <Checkbox value="0">选项一</Checkbox>
              <Checkbox value="1">选项二</Checkbox>
              <Checkbox value="2" disabled>选项三</Checkbox>
            </Checkbox.Group>
          }
        >
          幽灵按钮
        </Cell>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 块级样式
```jsx
import { Cell, Checkbox } from 'zarm';

ReactDOM.render(
  <Cell>
    <Checkbox.Group block type="button">
      <Checkbox value="0">选项一</Checkbox>
      <Checkbox value="1">选项二</Checkbox>
      <Checkbox value="2">选项三</Checkbox>
    </Checkbox.Group>
  </Cell>
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
    <Checkbox value="2" checked>选项三</Checkbox>
  </Checkbox.Group>
, mountNode);
```



## API

### Checkbox
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| type | string | - | 显示类型，可选值 `button`, `cell` |
| disabled | boolean | false | 是否禁用 |
| value | string &#124; number | - | 值 |
| checked | boolean | - | 当前是否选中 |
| defaultChecked | boolean | - | 初始是否选中 |
| indeterminate | boolean | false | 当前是否为未全选状态 |
| id | string | - | 方便外部带有for属性的label标签控制当前checkbox |
| onChange | (event?: ChangeEvent<HTMLInputElement>) => void | - | 值变化时触发的回调函数 |

### Checkbox.Group
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| type | string | - | 显示类型，可选值 `button`, `cell` |
| value | number[] \| string[] | [] | 选中值 |
| defaultValue | number[] \| string[] | [] | 初始选中值 |
| disabled | boolean | false | 是否禁用 |
| block | boolean | false | 子项是否为块级元素 |
| onChange | (values?: number[] \| string[]) => void | - | 值变化时触发的回调函数 |
| size | string | 'xs' | 按钮类型时的大小，可选值为 `lg`、`md`、`sm`、`xs` |
| shape | string | 'radius' | 按钮类型时的形状，可选值 `rect`, `radius`, `round` | 
| ghost | boolean | false | 按钮类型时，选中项样式是否为幽灵按钮 |
