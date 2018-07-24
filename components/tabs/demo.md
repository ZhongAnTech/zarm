## 标签页 Tabs

:::demo 基本用法
```jsx
import { Tabs } from 'zarm';
const { Panel } = Tabs;

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Tabs onChange={(i) => { console.log(i); }}>
          <Panel title="选项卡1">
            <div className="content">选项卡1内容</div>
          </Panel>
          <Panel title="选项卡2">
            <div className="content">选项卡2内容</div>
          </Panel>
        </Tabs>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 可滑动
```jsx
import { Tabs } from 'zarm';
const { Panel } = Tabs;

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Tabs canSwipe onChange={(i) => { console.log(i); }}>
          <Panel title="选项卡1">
            <div className="content">试试点我左滑</div>
          </Panel>
          <Panel title="选项卡2">
            <div className="content">试试点我右滑</div>
          </Panel>
        </Tabs>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 指定默认选项
```jsx
import { Tabs } from 'zarm';
const { Panel } = Tabs;

class Demo extends React.Component {
  render() {
    return (
      <div>
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
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 指定线条宽度
```jsx
import { Tabs } from 'zarm';
const { Panel } = Tabs;

class Demo extends React.Component {
  render() {
    return (
      <div>
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
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 禁用指定选项
```jsx
import { Tabs } from 'zarm';
const { Panel } = Tabs;

class Demo extends React.Component {
  render() {
    return (
      <div>
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
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::api API

#### Tabs
| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-tabs | | 类名前缀 |
| className | string | | | 追加类名 |
| value | string | | | 值 |
| defaultValue | string | | | 初始值 |
| disabled | boolean | false | | 是否禁用 |
| canSwipe | boolean | false | | 是否支持滑动切换 |
| lineWidth | number &#124; string | | | 线条宽度 |
| onChange | <code>(index: number) => void</code> | noop | \(index: number\) | 值变化时触发的回调函数 |


#### Panel
| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| className | string | | | 追加类名 |
| disabled | boolean | false | | 是否禁用 |
| title | string | | | 标题 |
| children | number | | | 内容 |

:::