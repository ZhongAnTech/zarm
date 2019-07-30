# Switch 开关



## 基本用法
```jsx
import { Switch, Cell } from 'zarm';

class Demo extends React.Component {
  state = {
    value: false,
  };

  toggle = (value) => {
    this.setState({
      value,
    });
    console.log(value);
  }

  render() {
    return (
      <>
        <Cell
          description={
            <Switch
              checked={this.state.value}
              onChange={(value) => {
                this.setState({ value });
                console.log(value);
              }}
            />
          }
        >
          普通
        </Cell>
        <Cell description={<Switch defaultChecked />}>默认开</Cell>
        <Cell description={<Switch disabled />}>禁用的开关（默认关）</Cell>
        <Cell description={<Switch defaultChecked disabled />}>禁用的开关（默认开）</Cell>
      </>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| checked | boolean | - | 值 |
| defaultChecked | boolean | - | 初始值 |
| disabled | boolean | false | 是否禁用 |
| onChange | (value?: boolean) => void | - | 值变化时触发的回调函数 |
