## 徽标 Badge

:::demo 基本用法
```jsx
import { Badge, Cell } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Cell hasArrow title="点状" description={<Badge text="99" />} onClick={() => {}} />
        <Cell hasArrow title="圆形" description={<Badge shape="circle" text={3} />} onClick={() => {}} />
        <Cell hasArrow title="椭圆形" description={<Badge shape="round" text="999+" />} onClick={() => {}} />
        <Cell hasArrow title="圆角" description={<Badge shape="radius" text="new" />} onClick={() => {}} />
        <Cell hasArrow title="直角" description={<Badge shape="rect" text="免费" />} onClick={() => {}} />
        <Cell hasArrow title="叶形" description={<Badge shape="leaf" text="新品" />} onClick={() => {}} />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 上标位置
```jsx
import { Badge } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div className="custom-panel">
        <div className="box">
          <Badge sup shape="dot"><div className="box-item" /></Badge>
        </div>
        <div className="box">
          <Badge sup shape="circle" text="3" theme='warning'><div className="box-item" /></Badge>
        </div>
        <div className="box">
          <Badge sup shape="round" text="999+" theme='success'><div className="box-item" /></Badge>
        </div>
        <div className="box">
          <Badge sup shape="radius" text="new"><div className="box-item" /></Badge>
        </div>
        <div className="box">
          <Badge sup shape="rect" text="免费"><div className="box-item" /></Badge>
        </div>
        <div className="box">
          <Badge sup shape="leaf" text="新品"><div className="box-item" /></Badge>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::

:::demo
```jsx
import { Badge } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div className="text-panel">
        <div className="box">
          <Badge sup shape="dot"><span className="box-text">邀请有奖</span></Badge>
        </div>
        <div className="box">
          <span className="box-text">邀请有奖</span><Badge sup shape="dot"/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::api API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-badge | | 类名前缀 |
| className | string | | | 追加类名 |
| theme | string | `error` | `default`, `primary`, `info`, `success`, `warning`, `error` | 主题 |
| text | string | | | 显示文字 |
| shape | string | | `dot`, `rect` , `radius`, `round`, `circle` ,`leaf` | 形状 |
| sup | bool | false | | 是否上标位置 |

:::
