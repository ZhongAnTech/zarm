## 滑动输入条 Slider

:::demo 基本用法
```jsx
import { Cell, Slider } from 'zarm';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  render() {
    return (
      <div>
        <Cell title="普通">
          <Slider
            value={this.state.value}
            onChange={(value) => {
              console.log(value);
            }}
          />
        </Cell>

        <Cell title="设置默认值">
          <Slider defaultValue={20} />
        </Cell>

        <Cell title="设置上下限">
          <Slider min={-100} max={100} defaultValue={0} />
        </Cell>

        <Cell title="设置步长">
          <Slider step={10} />
        </Cell>

        <Cell title="禁用状态">
          <Slider defaultValue={20} disabled />
        </Cell>
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
| prefixCls | string | za-slider | | 类名前缀 |
| className | string | | | 追加类名 |
| value | number | | | 值 |
| defaultValue | number | | | 初始值 |
| min | number | | | 最小值 |
| max | number | | | 最大值 |
| step | number | 1 | | 步长 |
| disabled | boolean | false | | 是否禁用 |
| onChange | <code>(value: number) => void</code> | noop | \(value: number\) | 值变化时触发的回调函数 |

:::