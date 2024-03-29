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
            const val = e.target.value;
            setTitle(val);
            console.log(`onChange: ${val}`);
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
import { Input, List, Icon } from 'zarm';

const PreviewIcon = Icon.createFromIconfont(
  '//lf1-cdn-tos.bytegoofy.com/obj/iconpark/svg_20337_14.627ee457cf7594fbbce6d5e14b8c29ef.js',
);

const Demo = () => {
  const [password, setPassword] = useState('');
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);

  return (
    <List>
      <List.Item
        title="密码输入"
        suffix={
          visible ? (
            <PreviewIcon type="preview-open" onClick={() => setVisible(!visible)} />
          ) : (
            <PreviewIcon type="preview-close" onClick={() => setVisible(!visible)} />
          )
        }
      >
        <Input
          type={visible ? 'text' : 'password'}
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
    <List.Item description="最少4个字符，包含大小写英文字母和数字">
      <Input label="账号" placeholder="请输入您的账号" />
    </List.Item>
    <List.Item description="最少8个字符，包含大小写英文字母、数字和字符">
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

## CSS 变量

| 属性                        | 默认值                             | 说明                       |
| :-------------------------- | :--------------------------------- | :------------------------- |
| --color                     | 'var(--za-color-text)'             | 字体颜色                   |
| --font-size                 | 'var(--za-font-size-md)'           | 字体大小                   |
| --height                    | '28px'                             | 输入框高度                 |
| --line-height               | '28px'                             | 输入框行高                 |
| --label-font-size           | 'var(--za-font-size-sm)'           | 标签字体大小               |
| --placeholder-color         | 'var(--za-color-text-placeholder)' | 占位符字体颜色             |
| --disabled-color            | 'var(--za-color-text-disabled)'    | 禁用状态下字体颜色         |
| --clear-icon-size           | '16px'                             | 清除按钮大小               |
| --clear-icon-color          | '#ccc'                             | 清除按钮颜色               |
| --textarea-length-font-size | 'var(--za-font-size-sm)'           | 多行文本内容长度的字体大小 |
| --textarea-length-color     | 'var(--za-color-text-disabled)'    | 多行文本内容长度的字体颜色 |
