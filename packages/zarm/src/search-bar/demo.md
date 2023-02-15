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

## 始终展示取消按钮

```jsx
import { useState } from 'react';
import { SearchBar } from 'zarm';

const Demo = () => {
  const [value, setValue] = useState('');

  return (
    <SearchBar
      showCancel={() => true}
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

## 获取焦点后展示取消按钮

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

## 自定义图标

```jsx
import { SearchBar, Button } from 'zarm';
import { WarningCircle } from '@zarm-design/icons';

const Demo = () => {
  const [icon, setIcon] = React.useState(<WarningCircle size="sm" />);

  return (
    <>
      <SearchBar icon={icon} />
      <div className="button-wrap">
        <Button size="xs" shape="radius" onClick={() => setIcon(null)}>
          不显示 Icon
        </Button>
        <Button size="xs" shape="radius" onClick={() => setIcon(undefined)}>
          默认 Icon
        </Button>
        <Button size="xs" shape="radius" onClick={() => setIcon(<WarningCircle size="sm" />)}>
          自定义 Icon
        </Button>
      </div>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性         | 类型                                                    | 默认值                 | 说明                                   |
| :----------- | :------------------------------------------------------ | :--------------------- | :------------------------------------- |
| placeholder  | string                                                  | '搜索'                 | 输入框占位符                           |
| value        | string                                                  | -                      | 值                                     |
| defaultValue | string                                                  | -                      | 初始值                                 |
| shape        | string                                                  | 'radius'               | 形状，可选值 `rect`, `radius`, `round` |
| disabled     | boolean                                                 | false                  | 是否禁用                               |
| showCancel   | boolean \| ((focus: boolean, value: string) => boolean) | false                  | 是否在搜索框右侧展示取消按钮           |
| cancelText   | React.ReactNode                                         | '取消'                 | 取消按钮显示的内容                     |
| maxLength    | number                                                  | -                      | 输入字数上限                           |
| clearable    | boolean                                                 | true                   | 是否提供清空输入框功能                 |
| icon         | React.ReactNode                                         | \<Search size="sm" /\> | 图标                                   |
| onChange     | (event: React.ChangeEvent\<HTMLInputElement\>) => void  | -                      | 值变化时触发的回调函数                 |
| onSubmit     | (value: string) => void                                 | -                      | 输入框回车时触发的回调函数             |
| onFocus      | (event: React.FocusEvent\<HTMLInputElement\>) => void   | -                      | 获取焦点时触发的回调函数               |
| onBlur       | (event: React.FocusEvent\<HTMLInputElement\>) => void   | -                      | 失去焦点时触发的回调函数               |

## CSS 变量

| 属性                       | 默认值                      | 说明               |
| :------------------------- | :-------------------------- | :----------------- |
| --background               | 'transparent'               | 背景色             |
| --height                   | '52px'                      | 高度               |
| --padding-horizontal       | '16px'                      | 左右留白内边距     |
| --input-padding-horizontal | '8px'                       | 输入框内边距       |
| --input-height             | '36px'                      | 输入框高度         |
| --input-background         | 'rgba(118, 118, 128, 0.12)' | 输入框背景色       |
| --input-font-size          | 'var(--za-font-size-md)'    | 输入框字体大小     |
| --input-placeholder-color  | '#808084'                   | 输入框占位符颜色   |
| --input-clear-icon-color   | '#8e8e92'                   | 输入框清除图标颜色 |
| --input-border-radius      | '10px'                      | 输入框圆角大小     |
| --cancel-font-size         | 'var(--za-font-size-md)'    | 取消按钮字体大小   |
| --cancel-color             | 'var(--za-theme-primary)'   | 取消按钮字体颜色   |
| --cancel-margin-left       | '13px'                      | 取消按钮左边距     |
| --cancel-transition        | 'all 0.2s'                  | 取消按钮动画       |
| --icon-margin-right        | '6px'                       | 输入框图标右边距   |
| --icon-color               | '#808084'                   | 输入框图标颜色     |
