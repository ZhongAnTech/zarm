# Tabs 标签页



## 基本用法
```jsx
import { Tabs } from 'zarm';

const { Panel } = Tabs;

class Demo extends React.Component {
  state = {
    value: 0,
  }

  onChange = (index) => {
    console.log(index);
    this.setState({ value: index })
  }

  render() {
    return (
      <Tabs value={this.state.value} onChange={this.onChange}>
        <Panel title="选项卡1">
          <div className="content">选项卡1内容</div>
        </Panel>
        <Panel title="选项卡2">
          <div className="content">选项卡2内容</div>
        </Panel>
      </Tabs>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 可滑动
```jsx
import { Tabs } from 'zarm';

const { Panel } = Tabs;

ReactDOM.render(
  <Tabs canSwipe onChange={(i) => { console.log(i); }}>
    <Panel title="选项卡1">
      <div className="content">试试点我左滑</div>
    </Panel>
    <Panel title="选项卡2">
      <div className="content">试试点我右滑</div>
    </Panel>
  </Tabs>
, mountNode);
```



## 指定默认选项
```jsx
import { Tabs } from 'zarm';

const { Panel } = Tabs;

ReactDOM.render(
  <Tabs defaultValue={1}>
    <Panel title="选项卡1">
      <div className="content">选项卡1内容</div>
    </Panel>
    <Panel title="选项卡2">
      <div className="content">选项卡2内容</div>
    </Panel>
    <Panel title="选项卡3">
      <div className="content">选项卡3内容</div>
    </Panel>
  </Tabs>
, mountNode);
```



## 指定线条宽度
```jsx
import { Tabs } from 'zarm';

const { Panel } = Tabs;

ReactDOM.render(
  <Tabs lineWidth={60}>
    <Panel title="选项卡1">
      <div className="content">选项卡1内容</div>
    </Panel>
    <Panel title="选项卡2">
      <div className="content">选项卡2内容</div>
    </Panel>
    <Panel title="选项卡3">
      <div className="content">选项卡3内容</div>
    </Panel>
  </Tabs>
, mountNode);
```



## 禁用指定选项
```jsx
import { Tabs } from 'zarm';

const { Panel } = Tabs;

ReactDOM.render(
  <Tabs>
    <Panel title="选项卡1">
      <div className="content">选项卡1内容</div>
    </Panel>
    <Panel title="选项卡2" disabled>
      <div className="content">选项卡2内容</div>
    </Panel>
    <Panel title="选项卡3">
      <div className="content">选项卡3内容</div>
    </Panel>
  </Tabs>
, mountNode);
```



## API

### Tabs
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | number | - | 值 |
| defaultValue | number | - | 初始值 |
| disabled | boolean | false | 是否禁用 |
| canSwipe | boolean | false | 是否支持滑动切换 |
| lineWidth | number \| string | - | 线条宽度 |
| onChange | (index?: number) => void | - | 值变化时触发的回调函数 |


### Panel
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| title | ReactNode | - | 标题 |
| children | ReactNode | - | 内容 |
| disabled | boolean | false | 是否禁用 |
