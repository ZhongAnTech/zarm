## 开关 Switch

:::demo 基本用法
```jsx
import { Switch, Cell } from 'zarm';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: true,
    };
  }

  toggle(value) {
    this.setState({
      value,
    });
  }

  render() {
    return (
      <div>
        <Cell
          description={
            <Switch
              checked={this.state.value}
              onChange={(value) => {
                this.setState({ value });
              }}
            />
          }
        >
          普通
        </Cell>
        <Cell description={<Switch defaultChecked />}>默认开</Cell>
        <Cell description={<Switch disabled />}>禁用的开关（默认关）</Cell>
        <Cell description={<Switch defaultChecked disabled />}>禁用的开关（默认开）</Cell>
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
| prefixCls | string | za-switch | | 类名前缀 |
| className | string | | | 追加类名 |
| checked | boolean | | | 值 |
| defaultChecked | boolean | | | 初始值 |
| disabled | boolean | false | | 是否禁用 |
| onChange | <code>(value: boolean) => void</code> | | \(value: boolean\) | 值变化时触发的回调函数 |
| style | React.CSSProperties | | | 自定义样式 |


:::