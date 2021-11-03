# Input 文本框

## 基本用法

```jsx
import { useState, useRef } from 'react';
import { Input, List, Button } from 'zarm';

const Demo = () => {
  const focusInput = useRef();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <List>
      <List.Item title="单行文本">
        <Input
          ref={focusInput}
          placeholder="请输入"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            console.log(`onChange: ${e.target.value}`);
          }}
        />
      </List.Item>
      <List.Item title="多行文本">
        <Input
          rows={3}
          placeholder="请输入"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
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

## 带清除按钮

```jsx
import { useState } from 'react';
import { Input, List } from 'zarm';

const Demo = () => {
  const [value, setValue] = useState('');

  return (
    <List>
      <List.Item title="单行文本">
        <Input
          clearable
          placeholder="输入后右侧可见清除按钮"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            console.log(`onChange: ${e.target.value}`);
          }}
        />
      </List.Item>
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 原生类型

```jsx
import { useState } from 'react';
import { Input, List } from 'zarm';

const Demo = () => {
  const [password, setPassword] = useState('');
  const [value, setValue] = useState('');

  return (
    <List>
      <List.Item title="密码输入">
        <Input
          type="password"
          placeholder="请输入"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </List.Item>
      <List.Item title="搜索框">
        <Input
          type="search"
          placeholder="请输入"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </List.Item>
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 只读状态

```jsx
import { Input, List } from 'zarm';

ReactDOM.render(
  <List>
    <List.Item title="单行文本">
      <Input readOnly defaultValue="我是只读状态" />
    </List.Item>
    <List.Item title="多行文本">
      <Input readOnly rows={3} value="我是只读状态，我是只读状态，我是只读状态，我是只读状态。" />
    </List.Item>
  </List>,
  mountNode,
);
```

## 禁用状态

```jsx
import { Input, List } from 'zarm';

ReactDOM.render(
  <List>
    <List.Item title="单行文本">
      <Input disabled value="我是禁用状态" />
    </List.Item>
    <List.Item title="多行文本">
      <Input disabled rows={3} value="我是禁用状态，我是禁用状态，我是禁用状态，我是禁用状态。" />
    </List.Item>
  </List>,
  mountNode,
);
```

## 高度自适应

```jsx
import { useState } from 'react';
import { Input, List } from 'zarm';

const Demo = () => {
  const [value, setValue] = useState('');

  return (
    <List>
      <List.Item title="多行文本">
        <Input
          autoHeight
          rows={3}
          placeholder="请输入"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </List.Item>
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 显示输入字数

```jsx
import { useState } from 'react';
import { Input, List } from 'zarm';

const Demo = () => {
  const [value, setValue] = useState('');

  return (
    <List>
      <List.Item title="多行文本">
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
      </List.Item>
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 无标签栏

```jsx
import { Input, List } from 'zarm';

ReactDOM.render(
  <List>
    <List.Item>
      <Input placeholder="标题" />
    </List.Item>
    <List.Item>
      <Input autoHeight rows={4} maxLength={200} placeholder="摘要" />
    </List.Item>
  </List>,
  mountNode,
);
```

## 上下结构

```jsx
import { Input, List } from 'zarm';

ReactDOM.render(
  <List>
    <List.Item info="最少4个字符，包含大小写英文字母和数字">
      <Input label="账号" placeholder="请输入您的账号" />
    </List.Item>
    <List.Item info="最少8个字符，包含大小写英文字母、数字和字符">
      <Input label="密码" type="password" placeholder="请输入您的密码" />
    </List.Item>
    <List.Item>
      <Input
        label="个人介绍"
        autoHeight
        rows={4}
        maxLength={200}
        placeholder="请输入您的个人介绍"
      />
    </List.Item>
  </List>,
  mountNode,
);
```

## API

| 属性         | 类型                                                                          | 默认值 | 说明                                                                     |
| :----------- | :---------------------------------------------------------------------------- | :----- | :----------------------------------------------------------------------- |
| label        | ReactNode                                                                     | -      | 标签栏内容                                                               |
| type         | string                                                                        | 'text' | 类型，同原生 `input` 组件                                                |
| value        | number \| string                                                              | -      | 值                                                                       |
| defaultValue | number \| string                                                              | -      | 初始值                                                                   |
| disabled     | boolean                                                                       | false  | 是否禁用                                                                 |
| readOnly     | boolean                                                                       | false  | 是否只读                                                                 |
| rows         | number                                                                        | -      | 多行文本时的显示行数。type="text" 时有效。                               |
| autoHeight   | boolean                                                                       | false  | 是否高度自适应。多行文本（type="text" 且包含 rows 属性）时有效。         |
| autoFocus    | boolean                                                                       | false  | 是否自动获取焦点                                                         |
| maxLength    | number                                                                        | -      | 输入字数上限                                                             |
| showLength   | boolean                                                                       | false  | 是否显示输入字数。多行文本（type="text" 且包含 rows 属性）时有效。       |
| clearable    | boolean                                                                       | false  | 是否显示清除按钮。必须为受控组件（属性包含 value、onChange）时方可生效。 |
| onChange     | (event: React.ChangeEvent\<HTMLInputElement \| HTMLTextAreaElement\>) => void | -      | 值变化时触发的回调函数                                                   |
