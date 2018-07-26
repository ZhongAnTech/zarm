## 步进器 Stepper

:::demo 基本用法
```jsx
import { Cell, Stepper } from 'zarm';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
  }

  render() {
    return (
      <div>
        <Cell
          title="普通"
          description={
            <Stepper
              value={this.state.value}
              onChange={(value) => {
                console.log(value);
              }}
            />
          }
        />

        <Cell
          title="设置默认值"
          description={
            <Stepper defaultValue={2} />
          }
        />

        <Cell
          title="设置上下限"
          description={
            <Stepper min={-3} max={3} />
          }
        />

        <Cell
          title="设置步长"
          description={
            <Stepper step={0.5} />
          }
        />

        <Cell
          title="禁用状态"
          description={
            <Stepper disabled />
          }
        />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 多形状
```jsx
import { Cell, Stepper } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Cell
          title="圆角"
          description={
            <Stepper shape="radius" />
          }
        />

        <Cell
          title="圆形"
          description={
            <Stepper shape="circle" />
          }
        />
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
| prefixCls | string | za-stepper | | 类名前缀 |
| className | string | | | 追加类名 |
| theme | string | `primary` | `default`, `primary`, `info`, `success`, `warning`, `error` | 主题 |
| shape | string | | `radius`, `circle` | 形状 |
| value | number | | | 值 |
| defaultValue | number | | | 初始值 |
| min | number | | | 最小值 |
| max | number | | | 最大值 |
| step | number | 1 | | 步长 |
| disabled | boolean | false | | 是否禁用 |
| onInputChange | <code>(value: number) => void</code> | noop | \(value: number\) | 输入值变化时触发的回调函数 |
| onChange | <code>(value: number) => void</code> | noop | \(value: number\) | 值变化时触发的回调函数 |

:::