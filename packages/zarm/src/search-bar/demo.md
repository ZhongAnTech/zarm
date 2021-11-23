# SearchBar 搜索框

## 基本用法

```jsx
import { useState, useRef } from 'react';
import { SearchBar } from 'zarm';

const Demo = () => {
  const [value, setValue] = useState('');

  return (
    <SearchBar
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        console.log(`onChange: ${e.target.value}`);
      }}
      onFocus={() => {
        console.log('onFocus');
      }}
      onBlur={() => {
        console.log('onBlur');
      }}
      onSubmit={(value) => {
        console.log(`onSubmit: ${value}`);
      }}
      onCancel={() => {
        console.log(`onCancel`);
      }}
    />
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 始终展示搜索按钮

```jsx
import { useState } from 'react';
import { SearchBar } from 'zarm';

const Demo = () => {
  const [value, setValue] = useState('');

  return (
    <SearchBar
      showCancel
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        console.log(`onChange: ${e.target.value}`);
      }}
      onSubmit={(value) => {
        console.log(`onSubmit: ${value}`);
      }}
    />
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 多形状

```jsx
import { SearchBar } from 'zarm';

ReactDOM.render(
  <>
    <SearchBar shape="rect" />
    <SearchBar shape="round" />
  </>,
  mountNode,
);
```

## 手动获取焦点

```jsx
import { useRef } from 'react';
import { SearchBar, Button } from 'zarm';

const Demo = () => {
  const searchRef = useRef();

  return (
    <>
      <SearchBar ref={searchRef} />
      <div className="button-wrap">
        <Button
          theme="primary"
          size="xs"
          shape="radius"
          onClick={() => {
            searchRef.current.focus();
          }}
        >
          点击获取焦点
        </Button>
      </div>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性         | 类型                                                   | 默认值   | 说明                                   |
| :----------- | :----------------------------------------------------- | :------- | :------------------------------------- |
| placeholder  | string                                                 | '搜索'   | 输入框占位符                           |
| value        | string                                                 | -        | 值                                     |
| defaultValue | string                                                 | -        | 初始值                                 |
| shape        | string                                                 | 'radius' | 形状，可选值 `rect`, `radius`, `round` |
| disabled     | boolean                                                | false    | 是否禁用                               |
| showCancel   | boolean                                                | false    | 是否一直展示取消按钮                   |
| cancelText   | string                                                 | '取消'   | 取消按钮显示的内容                     |
| maxLength    | number                                                 | -        | 输入字数上限                           |
| clearable    | boolean                                                | true     | 是否提供清空输入框功能                 |
| onChange     | (event: React.ChangeEvent\<HTMLInputElement\>) => void | -        | 值变化时触发的回调函数                 |
| onSubmit     | (value: string) => void                                | -        | 输入框回车时触发的回调函数             |
| onFocus      | (event: React.FocusEvent\<HTMLInputElement\>) => void  | -        | 获取焦点时触发的回调函数               |
| onBlur       | (event: React.FocusEvent\<HTMLInputElement\>) => void  | -        | 失去焦点时触发的回调函数               |
