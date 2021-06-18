# Input 文本框

## 基本用法

```jsx
import { useState, useRef } from 'react';
import { Input, Cell, Button } from 'zarm';

const Demo = () => {
  const focusInput = useRef();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <>
      <Cell title="单行文本">
        <Input
          ref={focusInput}
          placeholder="请输入"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            console.log(`onChange: ${e.target.value}`);
          }}
        />
      </Cell>
      <Cell title="多行文本">
        <Input
          rows={3}
          placeholder="请输入"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </Cell>
      <Cell>
        <Button
          size="xs"
          theme="primary"
          onClick={() => {
            focusInput.current.focus();
          }}
        >
          click to focus the first input
        </Button>
      </Cell>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 原生类型

```jsx
import { useState } from 'react';
import { Input, Cell } from 'zarm';

const Demo = () => {
  const [password, setPassword] = useState('');
  const [value, setValue] = useState('');

  return (
    <>
      <Cell title="密码输入">
        <Input
          type="password"
          placeholder="请输入"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Cell>
      <Cell title="搜索框">
        <Input
          type="search"
          placeholder="请输入"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </Cell>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 只读状态

```jsx
import { Input, Cell } from 'zarm';

ReactDOM.render(
  <>
    <Cell title="单行文本">
      <Input readOnly defaultValue="我是只读状态" />
    </Cell>
    <Cell title="多行文本">
      <Input readOnly rows={3} value="我是只读状态，我是只读状态，我是只读状态，我是只读状态。" />
    </Cell>
  </>,
  mountNode,
);
```

## 禁用状态

```jsx
import { Input, Cell } from 'zarm';

ReactDOM.render(
  <>
    <Cell title="单行文本">
      <Input disabled value="我是禁用状态" />
    </Cell>
    <Cell title="多行文本">
      <Input disabled rows={3} value="我是禁用状态，我是禁用状态，我是禁用状态，我是禁用状态。" />
    </Cell>
  </>,
  mountNode,
);
```

## 无标签栏

```jsx
import { Input, Cell } from 'zarm';

ReactDOM.render(
  <>
    <Cell>
      <Input placeholder="标题" />
    </Cell>
    <Cell>
      <Input autoHeight rows={4} maxLength={200} placeholder="摘要" />
    </Cell>
  </>,
  mountNode,
);
```

## 高度自适应

```jsx
import { useState } from 'react';
import { Input, Cell } from 'zarm';

const Demo = () => {
  const [value, setValue] = useState('');

  return (
    <Cell title="多行文本">
      <Input
        autoHeight
        rows={3}
        placeholder="请输入"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </Cell>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 显示输入字数

```jsx
import { useState } from 'react';
import { Input, Cell } from 'zarm';

const Demo = () => {
  const [value, setValue] = useState('');

  return (
    <Cell title="多行文本">
      <Input
        autoHeight
        showLength
        maxLength={200}
        rows={3}
        placeholder="请输入"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </Cell>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性         | 类型                                                                       | 默认值 | 说明                                                                     |
| :----------- | :------------------------------------------------------------------------- | :----- | :----------------------------------------------------------------------- |
| type         | string                                                                     | 'text' | 类型，同原生 `input` 组件                                                |
| value        | number \| string                                                           | -      | 值                                                                       |
| defaultValue | number \| string                                                           | -      | 初始值                                                                   |
| disabled     | boolean                                                                    | false  | 是否禁用                                                                 |
| readOnly     | boolean                                                                    | false  | 是否只读                                                                 |
| rows         | number                                                                     | -      | 多行文本时的显示行数。type="text" 时有效。                               |
| autoHeight   | boolean                                                                    | false  | 是否高度自适应。多行文本（type="text" 且包含 rows 属性）时有效。         |
| autoFocus    | boolean                                                                    | false  | 是否自动获取焦点                                                         |
| maxLength    | number                                                                     | -      | 输入字数上限                                                             |
| showLength   | boolean                                                                    | false  | 是否显示输入字数。多行文本（type="text" 且包含 rows 属性）时有效。       |
| clearable    | boolean                                                                    | true   | 是否显示清除按钮。必须为受控组件（属性包含 value、onChange）时方可生效。 |
| onChange     | (e?: React.ChangeEvent\<HTMLInputElement \| HTMLTextAreaElement\>) => void | -      | 值变化时触发的回调函数                                                   |
