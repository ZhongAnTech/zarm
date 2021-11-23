# Checkbox 复选框

## 基本用法

```jsx
import { List, Checkbox } from 'zarm';

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
    <List.Item>
      <div className="agreement-box">
        <Checkbox id="agreement" />
        <label htmlFor="agreement">
          阅读并同意
          <a
            href="/#"
            onClick={(e) => {
              e.preventDefault();
              alert('agree it');
            }}
          >
            《XXX条款》
          </a>
          中的相关规定
        </label>
      </div>
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
  const [value, setValue] = useState([]);

  const onCheckedAll = (e) => {
    setValue(e.target.checked ? ['0', '1', '2'] : []);
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
        <Checkbox.Group value={value} onChange={setValue}>
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

## 块级样式

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
  </List>,
  mountNode,
);
```

## 按钮样式

```jsx
import { useState } from 'react';
import { List, Checkbox } from 'zarm';

const Demo = () => {
  const [value, setValue] = useState([]);

  return (
    <List>
      <List.Item
        title="普通"
        after={
          <Checkbox.Group
            type="button"
            value={value}
            onChange={(value) => {
              setValue(value);
              console.log(`checked to ${value}`);
            }}
          >
            <Checkbox value="0">选项一</Checkbox>
            <Checkbox value="1">选项二</Checkbox>
            <Checkbox value="2">选项三</Checkbox>
          </Checkbox.Group>
        }
      />
      <List.Item
        title="指定默认值"
        after={
          <Checkbox.Group type="button" defaultValue={['0', '1']}>
            <Checkbox value="0">选项一</Checkbox>
            <Checkbox value="1">选项二</Checkbox>
            <Checkbox value="2">选项三</Checkbox>
          </Checkbox.Group>
        }
      />
      <List.Item
        title="禁用指定项"
        after={
          <Checkbox.Group type="button">
            <Checkbox value="0">选项一</Checkbox>
            <Checkbox value="1" disabled>
              选项二
            </Checkbox>
            <Checkbox value="2" disabled checked>
              选项三
            </Checkbox>
          </Checkbox.Group>
        }
      />
      <List.Item
        title="直角"
        after={
          <Checkbox.Group type="button" buttonShape="rect">
            <Checkbox value="0">选项一</Checkbox>
            <Checkbox value="1">选项二</Checkbox>
            <Checkbox value="2">选项三</Checkbox>
          </Checkbox.Group>
        }
      />
      <List.Item
        title="椭圆角"
        after={
          <Checkbox.Group type="button" buttonShape="round">
            <Checkbox value="0">选项一</Checkbox>
            <Checkbox value="1">选项二</Checkbox>
            <Checkbox value="2">选项三</Checkbox>
          </Checkbox.Group>
        }
      />
      <List.Item
        title="大小"
        after={
          <Checkbox.Group type="button" buttonSize="sm" buttonShape="radius">
            <Checkbox value="0">选项一</Checkbox>
            <Checkbox value="1">选项二</Checkbox>
            <Checkbox value="2">选项三</Checkbox>
          </Checkbox.Group>
        }
      />
      <List.Item
        title="幽灵按钮"
        after={
          <Checkbox.Group buttonGhost type="button" defaultValue={['2']}>
            <Checkbox value="0">选项一</Checkbox>
            <Checkbox value="1">选项二</Checkbox>
            <Checkbox value="2" disabled>
              选项三
            </Checkbox>
          </Checkbox.Group>
        }
      />
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 按钮类型块级样式

```jsx
import { List, Checkbox } from 'zarm';

ReactDOM.render(
  <List>
    <List.Item>
      <Checkbox.Group block type="button">
        <Checkbox value="0">选项一</Checkbox>
        <Checkbox value="1">选项二</Checkbox>
        <Checkbox value="2">选项三</Checkbox>
      </Checkbox.Group>
    </List.Item>
  </List>,
  mountNode,
);
```

## 列表样式

```jsx
import { Checkbox } from 'zarm';

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

## 列表样式，禁用状态

```jsx
import { Checkbox } from 'zarm';

ReactDOM.render(
  <Checkbox.Group disabled type="list">
    <Checkbox value="0">选项一</Checkbox>
    <Checkbox value="1">选项二</Checkbox>
    <Checkbox value="2" checked>
      选项三
    </Checkbox>
  </Checkbox.Group>,
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
