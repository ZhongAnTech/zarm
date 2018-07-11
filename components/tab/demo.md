## 标签页 Tab

:::demo 基本用法
```jsx
import { Tab } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Tab onChange={(i) => { console.log(i); }}>
          <Tab.Panel title="选项卡1">
            <div className="content">选项卡1内容</div>
          </Tab.Panel>
          <Tab.Panel title="选项卡2">
            <div className="content">选项卡2内容</div>
          </Tab.Panel>
        </Tab>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 可滑动
```jsx
import { Tab } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Tab canSwipe onChange={(i) => { console.log(i); }}>
          <Tab.Panel title="选项卡1">
            <div className="content">试试点我左滑</div>
          </Tab.Panel>
          <Tab.Panel title="选项卡2">
            <div className="content">试试点我右滑</div>
          </Tab.Panel>
        </Tab>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 指定默认选项
```jsx
import { Tab } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Tab defaultValue={1}>
          <Tab.Panel title="选项卡1">
            <div className="content">选项卡1内容</div>
          </Tab.Panel>
          <Tab.Panel title="选项卡2">
            <div className="content">选项卡2内容</div>
          </Tab.Panel>
          <Tab.Panel title="选项卡3">
            <div className="content">选项卡3内容</div>
          </Tab.Panel>
        </Tab>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 指定线条宽度
```jsx
import { Tab } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Tab lineWidth={60}>
          <Tab.Panel title="选项卡1">
            <div className="content">选项卡1内容</div>
          </Tab.Panel>
          <Tab.Panel title="选项卡2">
            <div className="content">选项卡2内容</div>
          </Tab.Panel>
          <Tab.Panel title="选项卡3">
            <div className="content">选项卡3内容</div>
          </Tab.Panel>
        </Tab>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 禁用指定选项
```jsx
import { Tab } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Tab>
          <Tab.Panel title="选项卡1">
            <div className="content">选项卡1内容</div>
          </Tab.Panel>
          <Tab.Panel title="选项卡2" disabled>
            <div className="content">选项卡2内容</div>
          </Tab.Panel>
          <Tab.Panel title="选项卡3">
            <div className="content">选项卡3内容</div>
          </Tab.Panel>
        </Tab>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::api API

#### Tab
| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-tab | | 类名前缀 |
| className | string | | | 追加类名 |
| value | string | | | 值 |
| defaultValue | string | | | 初始值 |
| disabled | boolean | false | | 是否禁用 |
| canSwipe | boolean | false | | 是否支持滑动切换 |
| lineWidth | number &#124; string | | | 线条宽度 |
| onChange | <code>(index: number) => void</code> | noop | \(index: number\) | 值变化时触发的回调函数 |


#### Tab.Panel
| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| className | string | | | 追加类名 |
| disabled | boolean | false | | 是否禁用 |
| title | string | | | 标题 |
| children | number | | | 内容 |

:::