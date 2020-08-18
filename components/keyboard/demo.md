# Keyboard 虚拟键盘



## Keyboard 平铺键盘
```jsx
import { useState } from 'react';
import { Cell, Radio, Keyboard } from 'zarm';

const Demo = () => {
  const [type, setType] = useState('number');

  return (
    <>
      <Cell
        title="键盘类型"
        description={
          <Radio.Group
            compact
            type="button"
            value={type}
            onChange={setType}
          >
            <Radio value="number">数字键盘</Radio>
            <Radio value="price">金额键盘</Radio>
            <Radio value="idcard">身份证键盘</Radio>
          </Radio.Group>
        }
      />
      <Keyboard type={type} onKeyClick={(key) => console.log(key)} />
    </>
  );
}

ReactDOM.render(<Demo />, mountNode);
```



## KeyboardPicker 键盘触发器
```jsx
import { useState } from 'react';
import { Cell, Button, KeyboardPicker, Input } from 'zarm';

const Demo = () => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState('');

  const toggle = () => {
    setVisible(!visible);
  };

  const onKeyClick = (key) => {
    console.log(key);
    if (['close', 'ok'].indexOf(key) > -1) {
      toggle();
      return;
    }

    const value = [].concat(value);
    const newValue = (key === 'delete')
      ? value.slice(0, value.length - 1)
      : value + key;

    if (newValue !== value) {
      setValue(newValue);
    }
  };

  return (
    <>
      <Cell
        description={
          <Button size="xs" onClick={toggle}>{visible ? '关闭' : '开启'}</Button>
        }
      >
        拾取器触发方式
      </Cell>

      <KeyboardPicker
        visible={visible}
        onKeyClick={onKeyClick}
      />
    </>
  );
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
