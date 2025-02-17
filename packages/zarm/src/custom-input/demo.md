# CustomInput 自定义输入框

## 基本用法

```jsx
import { useState, useRef } from 'react';
import { CustomInput, List, Button } from 'zarm';

const Demo = () => {
  const focusInput = useRef();
  const [value, setValue] = useState('');

  return (
    <List>
      <List.Item title="数字">
        <CustomInput
          ref={focusInput}
          type="number"
          placeholder="type is number"
          value={value}
          onChange={(value) => {
            setValue(value);
            console.log(`onChange: ${value}`);
          }}
        />
      </List.Item>
      <List.Item title="金额">
        <CustomInput type="price" placeholder="type is price" defaultValue="12.00" />
      </List.Item>
      <List.Item title="身份证">
        <CustomInput type="idcard" maxLength={18} placeholder="type is idcard" />
      </List.Item>
      <List.Item>
        <Button
          size="xs"
          theme="primary"
          onClick={() => {
            focusInput.current.focus();
          }}
        >
          click to focus the first input
        </Button>
      </List.Item>
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 上下结构

```jsx
import { CustomInput, List } from 'zarm';

ReactDOM.render(
  <List>
    <List.Item>
      <CustomInput label="金额" type="price" placeholder="请输入金额" />
    </List.Item>
  </List>,
  mountNode,
);
```

## 只读状态

```jsx
import { CustomInput, List } from 'zarm';

ReactDOM.render(
  <List>
    <List.Item>
      <CustomInput readOnly type="price" defaultValue="12.00" />
    </List.Item>
  </List>,
  mountNode,
);
```

## 禁用状态

```jsx
import { CustomInput, List } from 'zarm';

ReactDOM.render(
  <List>
    <List.Item>
      <CustomInput disabled type="price" value="12.00" />
    </List.Item>
  </List>,
  mountNode,
);
```

## API

| 属性         | 类型                              | 默认值   | 说明                                                                     |
| :----------- | :-------------------------------- | :------- | :----------------------------------------------------------------------- |
| label        | ReactNode                         | -        | 标签栏内容                                                               |
| type         | string                            | 'number' | 类型，可选值 `number`、`idcard`、`price`                                 |
| value        | number \| string                  | -        | 值                                                                       |
| defaultValue | number \| string                  | -        | 初始值                                                                   |
| disabled     | boolean                           | false    | 是否禁用                                                                 |
| readOnly     | boolean                           | false    | 是否只读                                                                 |
| autoFocus    | boolean                           | false    | 是否自动获取焦点                                                         |
| maxLength    | number                            | -        | 输入字数上限                                                             |
| clearable    | boolean                           | false    | 是否显示清除按钮。必须为受控组件（属性包含 value、onChange）时方可生效。 |
| onChange     | (value: number \| string) => void | -        | 值变化时触发的回调函数                                                   |

## CSS 变量

| 属性                | 默认值                             | 说明               |
| :------------------ | :--------------------------------- | :----------------- |
| --color             | 'var(--za-color-text)'             | 字体颜色           |
| --font-size         | 'var(--za-font-size-md)'           | 字体大小           |
| --height            | '28px'                             | 输入框高度         |
| --line-height       | '28px'                             | 输入框行高         |
| --label-font-size   | 'var(--za-font-size-sm)'           | 标签字体大小       |
| --placeholder-color | 'var(--za-color-text-placeholder)' | 占位符字体颜色     |
| --disabled-color    | 'var(--za-color-text-disabled)'    | 禁用状态下字体颜色 |
| --clear-icon-size   | '16px'                             | 清除按钮大小       |
| --clear-icon-color  | '#ccc'                             | 清除按钮颜色       |
| --cursor-height     | '20px'                             | 光标高度           |
| --cursor-width      | '2px'                              | 光标宽度           |
| --cursor-color      | '#597cf6'                          | 光标颜色           |
