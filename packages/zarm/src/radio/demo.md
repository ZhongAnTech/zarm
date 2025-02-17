# Radio 复选框

## 基本用法

```jsx
import { List, Radio } from 'zarm';
import { Star, StarFill } from '@zarm-design/icons';

ReactDOM.render(
  <List>
    <List.Item>
      <Radio>普通</Radio>
    </List.Item>
    <List.Item>
      <Radio defaultChecked>默认选中</Radio>
    </List.Item>
    <List.Item>
      <Radio disabled>禁用</Radio>
    </List.Item>
    <List.Item>
      <Radio defaultChecked disabled>
        选中且禁用
      </Radio>
    </List.Item>
  </List>,
  mountNode,
);
```

## 组合使用

```jsx
import { useState } from 'react';
import { List, Radio } from 'zarm';

const Demo = () => {
  const [value, setValue] = useState([]);

  const onChange = (value) => {
    console.log('onChange', value);
    setValue(value);
  };

  return (
    <List>
      <List.Item>
        <Radio.Group value={value} onChange={onChange}>
          <Radio value="0">选项一</Radio>
          <Radio value="1">选项二</Radio>
          <Radio value="2">选项三</Radio>
        </Radio.Group>
      </List.Item>
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 禁用

```jsx
import { List, Radio } from 'zarm';

ReactDOM.render(
  <List>
    <List.Item>
      <Radio.Group disabled>
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>
    </List.Item>
  </List>,
  mountNode,
);
```

## 通栏样式

```jsx
import { List, Radio } from 'zarm';

ReactDOM.render(
  <List>
    <List.Item>
      <Radio.Group block>
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
      </Radio.Group>
    </List.Item>
  </List>,
  mountNode,
);
```

## 按钮样式

```jsx
import { Radio, List } from 'zarm';

ReactDOM.render(
  <List>
    <List.Item title="普通">
      <Radio.Group type="button">
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>
    </List.Item>
    <List.Item title="禁用">
      <Radio.Group type="button" disabled>
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>
    </List.Item>
    <List.Item title="通栏">
      <Radio.Group type="button" block>
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>
    </List.Item>
    <List.Item title="紧凑">
      <Radio.Group type="button" compact>
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>
    </List.Item>
  </List>,
  mountNode,
);
```

## 列表样式

```jsx
import { Radio } from 'zarm';
import { Star, StarFill } from '@zarm-design/icons';

ReactDOM.render(
  <Radio.Group type="list">
    <Radio value="0">选项一</Radio>
    <Radio value="1">选项二</Radio>
    <Radio value="2" disabled>
      选项三（禁止选择）
    </Radio>
  </Radio.Group>,
  mountNode,
);
```

## 列表样式（尾部图标）

```jsx
import { Radio } from 'zarm';

ReactDOM.render(
  <Radio.Group type="list" listIconAlign="after">
    <Radio value="0">选项一</Radio>
    <Radio value="1">选项二</Radio>
    <Radio value="2" disabled>
      选项三（禁止选择）
    </Radio>
  </Radio.Group>,
  mountNode,
);
```

## 自定义图标

```jsx
import { List, Radio, Button } from 'zarm';
import { Star, StarFill, CloseCircle, CloseCircleFill, Close, Success } from '@zarm-design/icons';

ReactDOM.render(
  <List>
    <List.Item>
      <Radio.Group>
        <Radio
          value="0"
          renderIcon={({ checked }) =>
            checked ? <Success theme="primary" /> : <Close theme="danger" />
          }
        >
          选项一
        </Radio>
        <Radio
          value="1"
          renderIcon={({ checked }) =>
            checked ? <StarFill theme="primary" /> : <Star theme="primary" />
          }
        >
          选项二
        </Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>
    </List.Item>
  </List>,
  mountNode,
);
```

## 自定义样式

```jsx
import { useState, useRef } from 'react';
import { List, Radio } from 'zarm';
import { Success } from '@zarm-design/icons';

const items = ['选项一', '选项二', '选项三'];

const Demo = () => {
  const [value, setValue] = useState(['0']);

  const onChange = (value) => {
    console.log('onChange', value);
    setValue(value);
  };

  const CustomRadio = (props) => {
    const RadioRef = useRef();

    return (
      <Radio
        ref={RadioRef}
        value={props.value}
        render={({ checked }) => (
          <div
            style={{
              position: 'relative',
              padding: '4px 8px',
              fontSize: 14,
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: checked ? 'var(--za-theme-primary)' : 'var(--za-theme-default)',
            }}
            onClick={() => {
              RadioRef.current.check();
            }}
          >
            <span
              style={{
                display: checked ? 'inline-block' : 'none',
                position: 'absolute',
                right: 0,
                top: 0,
                fontSize: 0,
              }}
            >
              <Success style={{ fontSize: 10 }} theme="primary" />
            </span>
            {props.label}
          </div>
        )}
      />
    );
  };
  return (
    <List>
      <List.Item>
        <Radio.Group
          value={value}
          onChange={onChange}
          style={{
            '--group-spacing-horizontal': '8px',
            '--group-spacing-vertical': '6px',
          }}
        >
          {items.map((item, index) => (
            <CustomRadio key={+index} value={String(index)} label={item} />
          ))}
        </Radio.Group>
      </List.Item>
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

### Radio

| 属性           | 类型                                             | 默认值 | 说明                                             |
| :------------- | :----------------------------------------------- | :----- | :----------------------------------------------- |
| disabled       | boolean                                          | false  | 是否禁用                                         |
| value          | string \| number                                 | -      | 值                                               |
| checked        | boolean                                          | false  | 当前是否选中                                     |
| defaultChecked | boolean                                          | false  | 初始是否选中                                     |
| id             | string                                           | -      | 方便外部带有 for 属性的 label 标签控制当前 Radio |
| onChange       | (event: ChangeEvent\<HTMLInputElement\>) => void | -      | 值变化时触发的回调函数                           |
| renderIcon     | (props: number \| string) => React.ReactNode     | -      | 自定义图标渲染函数                               |
| render         | (props: number \| string) => React.ReactNode     | -      | 自定义样式渲染函数                               |

### Radio.Group

| 属性          | 类型                               | 默认值   | 说明                                                |
| :------------ | :--------------------------------- | :------- | :-------------------------------------------------- |
| type          | string                             | -        | 显示类型，可选值 `button`、`list`                   |
| value         | number \| string                   | []       | 选中值                                              |
| defaultValue  | number \| string                   | []       | 初始选中值                                          |
| disabled      | boolean                            | false    | 是否禁用                                            |
| block         | boolean                            | false    | 子项是否为块级元素                                  |
| compact       | boolean                            | false    | 按钮类型时，是否为紧凑模式                          |
| listIconAlign | string                             | 'before' | type 为`list`时图标的位置，可选值 `before`、`after` |
| onChange      | (values: number \| string) => void | -        | 值变化时触发的回调函数                              |

## CSS 变量

### Radio

| 属性                         | 默认值                                       | 说明                 |
| :--------------------------- | :------------------------------------------- | :------------------- |
| --icon-size                  | '22px'                                       | 图标大小             |
| --icon-background            | 'transparent'                                | 图标背景色           |
| --icon-border-radius         | '22px'                                       | 图标圆角大虾皮       |
| --icon-border-width          | '1px'                                        | 图标边框粗细         |
| --icon-border-color          | 'rgb(199, 199, 204)'                         | 图标边框颜色         |
| --tick-font-size             | '16px'                                       | 勾选标记大小         |
| --tick-color                 | '#fff'                                       | 勾选标记颜色         |
| --tick-transition            | 'all 0.2s cubic-bezier(.71, -0.46, .88, .6)' | 勾选标记动画效果     |
| --text-margin-horizontal     | '8px'                                        | 文字横向外边距       |
| --active-opacity             | 0.6                                          | 激活状态透明度       |
| --checked-icon-background    | 'var(--za-theme-primary)'                    | 选中状态图标背景色   |
| --checked-icon-border-color  | 'var(--za-theme-primary)'                    | 选中状态图标边框颜色 |
| --checked-tick-color         | 'var(--za-theme-primary)'                    | 选中状态勾选标记颜色 |
| --disabled-icon-background   | '#f2f2f2'                                    | 禁用状态图标背景色   |
| --disabled-icon-border-color | 'rgba(199, 199, 204, 0.7)'                   | 禁用状态图标边框颜色 |
| --disabled-text-color        | 'rgba(0, 0, 0, 0.3)'                         | 禁用状态文字颜色     |
| --disabled--tick-color       | '#bcbcbc'                                    | 禁用状态勾选标记颜色 |

### Radio.Group

| 属性                       | 默认值 | 说明                 |
| :------------------------- | :----- | :------------------- |
| --group-spacing-vertical   | '8px'  | 组合使用时的纵向间距 |
| --group-spacing-horizontal | '24px' | 组合使用时的横向间距 |

## Radio 指令式 API

```js
// 选择
ref.current.check();
```
