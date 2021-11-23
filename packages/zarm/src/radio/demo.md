# Radio 单选框

## 基本用法

```jsx
import { Radio, List } from 'zarm';

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
import { List, Radio } from 'zarm';

ReactDOM.render(
  <List>
    <List.Item>
      <Radio.Group>
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>
    </List.Item>
  </List>,
  mountNode,
);
```

## 块级样式

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
import { useState } from 'react';
import { Radio, List } from 'zarm';

const Demo = () => {
  const [value, setValue] = useState('0');

  return (
    <List>
      <List.Item
        title="普通"
        after={
          <Radio.Group
            type="button"
            value={value}
            onChange={(value) => {
              setValue(value);
              console.log(`radio to ${value}`);
            }}
          >
            <Radio value="0">选项一</Radio>
            <Radio value="1">选项二</Radio>
            <Radio value="2">选项三</Radio>
          </Radio.Group>
        }
      />
      <List.Item
        title="指定默认值"
        after={
          <Radio.Group type="button" defaultValue="1">
            <Radio value="0">选项一</Radio>
            <Radio value="1">选项二</Radio>
            <Radio value="2">选项三</Radio>
          </Radio.Group>
        }
      />
      <List.Item
        title="禁用指定项"
        after={
          <Radio.Group type="button">
            <Radio value="0">选项一</Radio>
            <Radio value="1" disabled>
              选项二
            </Radio>
            <Radio value="2" disabled checked>
              选项三
            </Radio>
          </Radio.Group>
        }
      />
      <List.Item
        title="直角"
        after={
          <Radio.Group type="button" buttonShape="rect">
            <Radio value="0">选项一</Radio>
            <Radio value="1">选项二</Radio>
            <Radio value="2">选项三</Radio>
          </Radio.Group>
        }
      />
      <List.Item
        title="椭圆角"
        after={
          <Radio.Group type="button" buttonShape="round">
            <Radio value="0">选项一</Radio>
            <Radio value="1">选项二</Radio>
            <Radio value="2">选项三</Radio>
          </Radio.Group>
        }
      />
      <List.Item
        title="大小"
        after={
          <Radio.Group type="button" buttonSize="sm" buttonShape="radius">
            <Radio value="0">选项一</Radio>
            <Radio value="1">选项二</Radio>
            <Radio value="2">选项三</Radio>
          </Radio.Group>
        }
      />
      <List.Item
        title="幽灵按钮"
        after={
          <Radio.Group buttonCompact buttonGhost type="button" defaultValue="0">
            <Radio value="0">选项一</Radio>
            <Radio value="1">选项二</Radio>
            <Radio value="2">选项三</Radio>
          </Radio.Group>
        }
      />
      <List.Item
        title="紧凑模式"
        after={
          <Radio.Group buttonCompact type="button" defaultValue="0">
            <Radio value="0">选项一</Radio>
            <Radio value="1">选项二</Radio>
            <Radio value="2">选项三</Radio>
          </Radio.Group>
        }
      />
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 按钮类型块级样式

```jsx
import { List, Radio } from 'zarm';

ReactDOM.render(
  <List>
    <List.Item>
      <Radio.Group block type="button">
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

## 列表样式，尾部标记

```jsx
import { Radio } from 'zarm';

ReactDOM.render(
  <Radio.Group type="list" listMarkerAlign="after">
    <Radio value="0">选项一</Radio>
    <Radio value="1">选项二</Radio>
    <Radio value="2" disabled>
      选项三（禁止选择）
    </Radio>
  </Radio.Group>,
  mountNode,
);
```

## 列表样式，禁用状态

```jsx
import { Radio } from 'zarm';

ReactDOM.render(
  <Radio.Group disabled type="list">
    <Radio value="0">选项一</Radio>
    <Radio value="1">选项二</Radio>
    <Radio value="2" checked>
      选项三
    </Radio>
  </Radio.Group>,
  mountNode,
);
```

## API

### Radio

| 属性           | 类型                                             | 默认值 | 说明                   |
| :------------- | :----------------------------------------------- | :----- | :--------------------- |
| value          | string \| number                                 | -      | 值                     |
| checked        | boolean                                          | -      | 当前是否选中           |
| defaultChecked | boolean                                          | -      | 初始是否选中           |
| disabled       | boolean                                          | false  | 是否禁用               |
| onChange       | (event: ChangeEvent\<HTMLInputElement\>) => void | -      | 值变化时触发的回调函数 |

### Radio.Group

| 属性            | 类型                              | 默认值   | 说明                                                         |
| :-------------- | :-------------------------------- | :------- | :----------------------------------------------------------- |
| type            | string                            | -        | 显示类型，可选值 `button`、`list`                            |
| value           | string \| number                  | -        | 选中值                                                       |
| defaultValue    | string \| number                  | -        | 初始选中值                                                   |
| disabled        | boolean                           | false    | 是否禁用                                                     |
| block           | boolean                           | false    | 子项是否为块级元素                                           |
| onChange        | (value: string \| number) => void | -        | 值变化时触发的回调函数                                       |
| buttonSize      | string                            | 'xs'     | 按钮类型时的大小，可选值为 `lg`、`md`、`sm`、`xs`            |
| buttonShape     | string                            | 'radius' | 按钮类型时的形状，可选值 `rect`、`radius`、`round`、`circle` |
| buttonGhost     | boolean                           | false    | 按钮类型时，选中项样式是否为幽灵按钮                         |
| buttonCompact   | boolean                           | false    | 按钮类型时，是否为紧凑模式                                   |
| listMarkerAlign | string                            | 'before' | 列表类型时标记的位置，可选值 `before`、`after`               |
