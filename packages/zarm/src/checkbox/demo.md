# Checkbox 复选框

## 基本用法

```jsx
import { List, Checkbox } from 'zarm';
import { Star, StarFill } from '@zarm-design/icons';

ReactDOM.render(
  <List>
    <List.Item>
      <Checkbox>普通</Checkbox>
    </List.Item>
    <List.Item>
      <Checkbox defaultChecked>默认选中</Checkbox>
    </List.Item>
    <List.Item>
      <Checkbox disabled>禁用</Checkbox>
    </List.Item>
    <List.Item>
      <Checkbox defaultChecked disabled>
        选中且禁用
      </Checkbox>
    </List.Item>
  </List>,
  mountNode,
);
```

## 受控使用

```jsx
import { useState } from 'react';
import { List, Checkbox, Modal } from 'zarm';

const Demo = () => {
  const [checked, setChecked] = useState(false);

  const onChange = (e) => {
    if (!e.target.checked) {
      Modal.confirm({
        content: '是否要取消选择',
        cancelText: '不取消',
      }).then((res) => {
        res && setChecked(false);
      });
      return;
    }
    setChecked(true);
  };

  return (
    <List>
      <List.Item>
        <Checkbox checked={checked} onChange={onChange}>
          取消勾选前确认
        </Checkbox>
      </List.Item>
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 组合使用

```jsx
import { useState } from 'react';
import { List, Checkbox } from 'zarm';

const Demo = () => {
  const [value, setValue] = useState(['1']);
  const [checked, setChecked] = useState(true);

  const onCheckedAll = (e) => {
    setValue(e.target.checked ? ['0', '1', '2'] : []);
  };

  const onChange = (value) => {
    console.log('onChange', value);
    setValue(value);
  };
  return (
    <List>
      <List.Item>
        <Checkbox
          checked={value.length === 3}
          indeterminate={value.length < 3 && value.length > 0}
          onChange={onCheckedAll}
        >
          全选 / 反选
        </Checkbox>
      </List.Item>
      <List.Item>
        <Checkbox checked={checked} onChange={setChecked}>
          选项xxx
        </Checkbox>
        <Checkbox.Group value={value} onChange={onChange}>
          <Checkbox value="0">选项一</Checkbox>
          <Checkbox value="1">选项二</Checkbox>
          <Checkbox value="2">选项三</Checkbox>
        </Checkbox.Group>
      </List.Item>
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 按钮样式

```jsx
import { List, Checkbox } from 'zarm';

ReactDOM.render(
  <List>
    <List.Item>
      <Checkbox.Group type="button">
        <Checkbox value="0" checked>
          选项一
        </Checkbox>
        <Checkbox value="1">选项二</Checkbox>
        <Checkbox value="2" disabled>
          选项三
        </Checkbox>
      </Checkbox.Group>
    </List.Item>
  </List>,
  mountNode,
);
```

## 列表样式

```jsx
import { Checkbox } from 'zarm';
import { Star, StarFill } from '@zarm-design/icons';

ReactDOM.render(
  <Checkbox.Group type="list">
    <Checkbox value="0">选项一</Checkbox>
    <Checkbox value="1">选项二</Checkbox>
    <Checkbox value="2" disabled>
      选项三（禁止选择）
    </Checkbox>
  </Checkbox.Group>,
  mountNode,
);
```

## 列表样式，尾部标记

```jsx
import { Checkbox } from 'zarm';

ReactDOM.render(
  <Checkbox.Group type="list" listMarkerAlign="after">
    <Checkbox value="0">选项一</Checkbox>
    <Checkbox value="1">选项二</Checkbox>
    <Checkbox value="2" disabled>
      选项三（禁止选择）
    </Checkbox>
  </Checkbox.Group>,
  mountNode,
);
```

## 通栏块级样式

```jsx
import { List, Checkbox } from 'zarm';

ReactDOM.render(
  <List>
    <List.Item>
      <Checkbox.Group block>
        <Checkbox value="0">选项一</Checkbox>
        <Checkbox value="1">选项二</Checkbox>
      </Checkbox.Group>
    </List.Item>
    <List.Item>
      <Checkbox.Group block type="button">
        <Checkbox value="0">选项一</Checkbox>
        <Checkbox value="1">选项二</Checkbox>
      </Checkbox.Group>
    </List.Item>
  </List>,
  mountNode,
);
```

## 自定义选项样式

```jsx
import { List, Checkbox, Button } from 'zarm';
import { Star, StarFill, CloseCircle, CloseCircleFill, Close, Success } from '@zarm-design/icons';

ReactDOM.render(
  <List>
    <List.Item>
      <Checkbox.Group>
        <Checkbox
          value="0"
          renderIcon={({ checked }) =>
            checked ? <Success theme="primary" /> : <Close theme="danger" />
          }
        >
          选项一
        </Checkbox>
        <Checkbox
          value="1"
          renderIcon={({ checked }) =>
            checked ? <StarFill theme="primary" /> : <Star theme="primary" />
          }
        >
          选项二
        </Checkbox>
        <Checkbox value="2">选项三</Checkbox>
      </Checkbox.Group>
    </List.Item>
    <List.Item>
      <Checkbox.Group
        renderIcon={({ checked }) =>
          checked ? <StarFill theme="primary" /> : <Star theme="primary" />
        }
      >
        <Checkbox value="0">选项一</Checkbox>
        <Checkbox value="1">选项二</Checkbox>
        <Checkbox value="2">选项三</Checkbox>
      </Checkbox.Group>
    </List.Item>
  </List>,
  mountNode,
);
```

## API

### Checkbox

| 属性           | 类型                                             | 默认值 | 说明                                                |
| :------------- | :----------------------------------------------- | :----- | :-------------------------------------------------- |
| type           | string                                           | -      | 显示类型，可选值 `button`, `list`                   |
| disabled       | boolean                                          | false  | 是否禁用                                            |
| value          | string &#124; number                             | -      | 值                                                  |
| checked        | boolean                                          | -      | 当前是否选中                                        |
| defaultChecked | boolean                                          | -      | 初始是否选中                                        |
| indeterminate  | boolean                                          | false  | 当前是否为未全选状态                                |
| id             | string                                           | -      | 方便外部带有 for 属性的 label 标签控制当前 checkbox |
| onChange       | (event: ChangeEvent\<HTMLInputElement\>) => void | -      | 值变化时触发的回调函数                              |

### Checkbox.Group

| 属性         | 类型                                   | 默认值   | 说明                                                         |
| :----------- | :------------------------------------- | :------- | :----------------------------------------------------------- |
| type         | string                                 | -        | 显示类型，可选值 `button`、`list`                            |
| value        | number[] \| string[]                   | []       | 选中值                                                       |
| defaultValue | number[] \| string[]                   | []       | 初始选中值                                                   |
| disabled     | boolean                                | false    | 是否禁用                                                     |
| block        | boolean                                | false    | 子项是否为块级元素                                           |
| onChange     | (values: number[] \| string[]) => void | -        | 值变化时触发的回调函数                                       |
| buttonSize   | string                                 | 'xs'     | 按钮类型时的大小，可选值为 `lg`、`md`、`sm`、`xs`            |
| buttonShape  | string                                 | 'radius' | 按钮类型时的形状，可选值 `rect`、`radius`、`round`、`circle` |
| buttonGhost  | boolean                                | false    | 按钮类型时，选中项样式是否为幽灵按钮                         |

## CSS 变量

### Checkbox

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

### Checkbox.Group

| 属性                       | 默认值 | 说明                 |
| :------------------------- | :----- | :------------------- |
| --group-spacing-vertical   | '8px'  | 组合使用时的纵向间距 |
| --group-spacing-horizontal | '24px' | 组合使用时的横向间距 |
