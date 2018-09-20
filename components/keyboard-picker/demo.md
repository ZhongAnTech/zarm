## 虚拟键盘 Keyboard & KeyboardPicker

:::demo 平铺键盘 Keyboard
```jsx
import { Cell, Select, Keyboard } from 'zarm';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'number',
    };
  }

  render() {
    return (
      <div>
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
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 键盘触发器 KeyboardPicker
```jsx
import { Cell, Button, KeyboardPicker, Input } from 'zarm';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value: '',
    };
  }

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
      <div>
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
| prefixCls | string | za-picker | | 类名前缀 |
| className | string | | | 追加类名 |
| type | 'number' &#124; 'price' &#124; 'idcard' &#124; | 'number' | | 键盘类型 |
| onKeyClick | function | <code>(key: string) => void</code> | | 点击按键时触发的回调函数 |

#### 仅 KeyboardPicker 支持的属性
| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| visible | boolean | false | | 是否展示 |

:::