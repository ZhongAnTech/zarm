# Mask 遮罩



## 基本用法
```jsx
import { Cell, Button, Mask } from 'zarm';

class Demo extends React.Component {
  state = {
    visible: false,
  };

  toggle = () => {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    return (
      <>
        <Cell
          title="默认"
          description={<Button size="sm" onClick={() => this.toggle()}>开启</Button>}
        />
        <Mask visible={this.state.visible} onClick={() => this.toggle()} />
      </>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## API

| 属性 | 类型 | 必填 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| visible | boolean | 否 | false | 是否显示 |
| type | 'normal' \| 'transparent' | 否 | 'normal' | 类型 |
| onClick | MouseEventHandler<HTMLDivElement\> | 否 | \&nbsp; | 点击后触发的回调函数 |
