# Collapse 折叠面板



## 基本用法
```jsx
import { Collapse } from 'zarm';

class Demo extends React.Component {
  state = {
    activeKey: 1,
  }

  onChange = (activeKey) => {
    console.log(activeKey);
    this.setState({ activeKey })
  }

  render() {
    return (
      <Collapse activeKey={this.state.activeKey} onChange={this.onChange}>
        <Collapse.Item key={1} title="Header of Item1">
          This is content of item1. This is content of item1. This is content of item1.
        </Collapse.Item>
        <Collapse.Item key={2} title="Header of Item2">
          This is content of item2. This is content of item2. This is content of item2.
        </Collapse.Item>
        <Collapse.Item key={3} title="Header of Item3">
          This is content of item3. This is content of item3. This is content of item3.
        </Collapse.Item>
      </Collapse>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 基本用法
```jsx
import { Collapse, Cell } from 'zarm';

ReactDOM.render(
  <Collapse>
    <Collapse.Item key="1" title="Header of Item1">
      This is content of item1. This is content of item1. This is content of item1.
    </Collapse.Item>
    <Collapse.Item key="2" title="Header of Item2">
      This is content of item2. This is content of item2. This is content of item2.
    </Collapse.Item>
    <Collapse.Item key="3" title="Header of Item3">
      This is content of item3. This is content of item3. This is content of item3.
    </Collapse.Item>
  </Collapse>
, mountNode);
```



## 手风琴模式
```jsx
import { Collapse } from 'zarm';

ReactDOM.render(
  <Collapse animated>
    <Collapse.Item key="test1" title="Header of Item1">
      This is content of item1. This is content of item1. This is content of item1.
    </Collapse.Item>
    <Collapse.Item key="test2" title="Header of Item2">
      This is content of item2. This is content of item2. This is content of item2.
    </Collapse.Item>
    <Collapse.Item key="test3" title="Header of Item3">
      This is content of item3. This is content of item3. This is content of item3.
    </Collapse.Item>
  </Collapse>
, mountNode);
```



## 默认展开项
```jsx
import { Collapse } from 'zarm';

ReactDOM.render(
  <Collapse defaultActiveKey={['test1', 'test2']} animated>
    <Collapse.Item key="test1" title="Header of Item1">
      This is content of item1. This is content of item1. This is content of item1.
    </Collapse.Item>
    <Collapse.Item key="test2" title="Header of Item2">
      This is content of item2. This is content of item2. This is content of item2.
    </Collapse.Item>
    <Collapse.Item key="test3" title="Header of Item3">
      This is content of item3. This is content of item3. This is content of item3.
    </Collapse.Item>
  </Collapse>
, mountNode);
```



## 允许展开多项
```jsx
import { Collapse } from 'zarm';

ReactDOM.render(
  <Collapse animated multiple defaultActiveKey={['test1', 'test3']} onChange={(activeKey) => console.log(activeKey)}>
    <Collapse.Item key="test1" title="Header of Item1" onChange={(active) => console.log(`active: ${active}`)}>
      This is content of item1. This is content of item1. This is content of item1.
    </Collapse.Item>
    <Collapse.Item key="test2" title="Header of Item2">
      This is content of item2. This is content of item2. This is content of item2.
    </Collapse.Item>
    <Collapse.Item key="test3" title="Header of Item3">
      This is content of item3. This is content of item3. This is content of item3.
    </Collapse.Item>
  </Collapse>
, mountNode);
```



## 禁用子项
```jsx
import { Collapse } from 'zarm';

ReactDOM.render(
  <Collapse multiple defaultActiveKey={['test2']}>
    <Collapse.Item key="test1" title="Header of Item1">
      This is content of item1. This is content of item1. This is content of item1.
    </Collapse.Item>
    <Collapse.Item key="test2" title="Header of Item2" disabled>
      This is content of item2. This is content of item2. This is content of item2.
    </Collapse.Item>
    <Collapse.Item key="test3" title="Header of Item3" disabled>
      This is content of item3. This is content of item3. This is content of item3.
    </Collapse.Item>
  </Collapse>
, mountNode);
```



## API

## Collapse
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| multiple | boolean | false | 是否可以同时展开多项 |
| animated | boolean | false | 是否添加展开动画 |
| activeKey | string \| number \| string[] \| number[] | [] | 动态更新展开项的索引数组或字符串或数字 |
| defaultActiveKey | string \| number \| string[] \| number[] | [] | 初始化默认展开项的索引数组或字符串或数字 |
| onChange | (activeKey?: string \| number \| string[] \| number[]) => void | - | 点击某一项的回调函数，返回选中的项 |

## Collapse.Item
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| title | ReactNode | - | 每一项的名称 |
| key | string \| number | - | 对应activeKey |
| disabled | boolean | false | 是否禁用 |
| onChange | (active?: boolean) => void | - | 点击某一项的回调函数 |
