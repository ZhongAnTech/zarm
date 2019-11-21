# Keyboard 虚拟键盘



## Keyboard 平铺键盘
```jsx
import { Cell, Select, Keyboard } from 'zarm';

class Demo extends React.Component {
  state = {
    type: 'number',
  };

  render() {
    return (
      <>
        <Cell title="键盘类型">
          <Select
            value={this.state.type}
            dataSource={[
              { value: 'number', label: '数字键盘' },
              { value: 'price', label: '金额键盘' },
              { value: 'idcard', label: '身份证键盘' },
            ]}
            onOk={(selected) => {
              this.setState({
                type: selected.map(item => item.value)[0],
              });
            }}
          />
        </Cell>
        <Keyboard type={this.state.type} onKeyClick={(key) => console.log(key)} />
      </>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## KeyboardPicker 键盘触发器
```jsx
import { Cell, Button, KeyboardPicker, Input } from 'zarm';

class Demo extends React.Component {
  state = {
    visible: false,
    value: '',
  };

  toggle() {
    this.setState({ visible: !this.state.visible });
  }

  onKeyClick(key) {
    console.log(key);
    if (['close', 'ok'].indexOf(key) > -1) {
      this.toggle();
      return;
    }

    const value = this.state.value;
    const newValue = (key === 'delete')
      ? value.slice(0, value.length - 1)
      : value + key;

    if (newValue !== value) {
      this.setState({ value: newValue });
    }
  }

  render() {
    const { visible } = this.state;
    return (
      <>
        <Cell
          description={
            <Button size="xs" onClick={() => this.toggle()}>{visible ? '关闭' : '开启'}</Button>
          }
        >
          拾取器触发方式
        </Cell>

        <KeyboardPicker
          visible={visible}
          onKeyClick={(key) => this.onKeyClick(key)}
        />
      </>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| type | string | 'number' | 键盘类型，可选值 `number`、`price`、`idcard` |
| onKeyClick | (key?: string) => void | - | 点击按键时触发的回调函数 |

### 仅 KeyboardPicker 支持的属性
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| visible | boolean | false | 是否展示 |
| destroy | boolean | true | 弹层关闭后是否移除节点 |
