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
        suffix={
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
        suffix={
          <Radio.Group type="button" defaultValue="1">
            <Radio value="0">选项一</Radio>
            <Radio value="1">选项二</Radio>
            <Radio value="2">选项三</Radio>
          </Radio.Group>
        }
      />
      <List.Item
        title="禁用指定项"
        suffix={
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
        suffix={
          <Radio.Group type="button" buttonShape="rect">
            <Radio value="0">选项一</Radio>
            <Radio value="1">选项二</Radio>
            <Radio value="2">选项三</Radio>
          </Radio.Group>
        }
      />
      <List.Item
        title="椭圆角"
        suffix={
          <Radio.Group type="button" buttonShape="round">
            <Radio value="0">选项一</Radio>
            <Radio value="1">选项二</Radio>
            <Radio value="2">选项三</Radio>
          </Radio.Group>
        }
      />
      <List.Item
        title="大小"
        suffix={
          <Radio.Group type="button" buttonSize="sm" buttonShape="radius">
            <Radio value="0">选项一</Radio>
            <Radio value="1">选项二</Radio>
            <Radio value="2">选项三</Radio>
          </Radio.Group>
        }
      />
      <List.Item
        title="幽灵按钮"
        suffix={
          <Radio.Group buttonCompact buttonGhost type="button" defaultValue="0">
            <Radio value="0">选项一</Radio>
            <Radio value="1">选项二</Radio>
            <Radio value="2">选项三</Radio>
          </Radio.Group>
        }
      />
      <List.Item
        title="紧凑模式"
        suffix={
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

## CSS 变量

### Radio

| 属性                           | 默认值                                       | 说明                     |
| :----------------------------- | :------------------------------------------- | :----------------------- |
| --widget-size                  | '22px'                                       | 控件大小                 |
| --widget-background            | 'transparent'                                | 控件背景色               |
| --widget-border-radius         | '22px'                                       | 控件圆角大虾皮           |
| --widget-border-width          | '1px'                                        | 控件边框粗细             |
| --widget-border-color          | 'rgb(199, 199, 204)'                         | 控件边框颜色             |
| --marker-font-size             | '16px'                                       | 勾选图标大小             |
| --marker-color                 | '#fff'                                       | 勾选图标颜色             |
| --marker-transition            | 'all 0.2s cubic-bezier(.71, -0.46, .88, .6)' | 勾选图标动画效果         |
| --text-margin-horizontal       | '8px'                                        | 文字横向外边距           |
| --active-opacity               | 0.6                                          | 激活状态透明度           |
| --checked-widget-background    | 'var(--za-theme-primary)'                    | 选中状态控件背景色       |
| --checked-widget-border-color  | 'var(--za-theme-primary)'                    | 选中状态控件边框颜色     |
| --checked-marker-color         | 'var(--za-theme-primary)'                    | 选中状态勾选图标颜色     |
| --disabled-widget-background   | '#f2f2f2'                                    | 禁用状态控件背景色       |
| --disabled-widget-border-color | 'rgba(199, 199, 204, 0.7)'                   | 禁用状态控件控件边框颜色 |
| --disabled-text-color          | 'rgba(0, 0, 0, 0.3)'                         | 禁用状态控件文字颜色     |
| --disabled--marker-color       | '#bcbcbc'                                    | 禁用状态控件勾选图标颜色 |

### Radio.Group

| 属性                       | 默认值 | 说明                 |
| :------------------------- | :----- | :------------------- |
| --group-spacing-vertical   | '8px'  | 组合使用时的纵向间距 |
| --group-spacing-horizontal | '24px' | 组合使用时的横向间距 |
