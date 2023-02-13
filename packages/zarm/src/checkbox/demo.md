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
        <Checkbox.Group value={value} onChange={onChange}>
          <Checkbox value="0">选项一</Checkbox>
          <Checkbox value="1">选项二</Checkbox>
          <Checkbox value="2">选项三</Checkbox>
          <Checkbox value="3">选项三</Checkbox>
        </Checkbox.Group>
      </List.Item>
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 禁用

```jsx
import { List, Checkbox } from 'zarm';

ReactDOM.render(
  <List>
    <List.Item>
      <Checkbox.Group disabled>
        <Checkbox value="0">选项一</Checkbox>
        <Checkbox value="1">选项二</Checkbox>
        <Checkbox value="2">选项三</Checkbox>
      </Checkbox.Group>
    </List.Item>
  </List>,
  mountNode,
);
```

## 通栏样式

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
import { Checkbox, List } from 'zarm';

ReactDOM.render(
  <List>
    <List.Item title="普通">
      <Checkbox.Group type="button">
        <Checkbox value="0">选项一</Checkbox>
        <Checkbox value="1">选项二</Checkbox>
        <Checkbox value="2" disabled>选项三</Checkbox>
      </Checkbox.Group>
    </List.Item>
    <List.Item title="通栏">
      <Checkbox.Group type="button" block>
        <Checkbox value="0">选项一</Checkbox>
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

## 列表样式（尾部图标）

```jsx
import { Checkbox } from 'zarm';

ReactDOM.render(
  <Checkbox.Group type="list" iconAlign="after">
    <Checkbox value="0">选项一</Checkbox>
    <Checkbox value="1">选项二</Checkbox>
    <Checkbox value="2" disabled>
      选项三（禁止选择）
    </Checkbox>
  </Checkbox.Group>,
  mountNode,
);
```

## 自定义图标

```jsx
import { List, Checkbox } from 'zarm';
import { Star, StarFill, Success, Close  } from '@zarm-design/icons';

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
  </List>,
  mountNode,
);
```

## 自定义样式

```jsx
import { useState, useRef } from 'react';
import { List, Checkbox } from 'zarm';
import { Success } from '@zarm-design/icons';

const items = ['选项一', '选项二', '选项三'];

const Demo = () => {
  const [value, setValue] = useState(['0']);

  const onChange = (value) => {
    console.log('onChange', value);
    setValue(value);
  };

  const CustomCheckbox = (props) => {
    const checkboxRef = useRef();

    return (
      <Checkbox
        ref={checkboxRef}
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
              checkboxRef.current.toggle();
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
        <Checkbox.Group
          value={value}
          onChange={onChange}
          style={{
            '--group-spacing-horizontal': '8px',
            '--group-spacing-vertical': '6px',
          }}
        >
          {items.map((item, index) => (
            <CustomCheckbox key={+index} value={String(index)} label={item} />
          ))}
        </Checkbox.Group>
      </List.Item>
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

### Checkbox

| 属性           | 类型                                             | 默认值 | 说明                                                |
| :------------- | :----------------------------------------------- | :----- | :-------------------------------------------------- |
| disabled       | boolean                                          | false  | 是否禁用                                            |
| value          | number \| string                             | -      | 值                                                  |
| checked        | boolean                                          | false  | 当前是否选中                                        |
| defaultChecked | boolean                                          | false  | 初始是否选中                                        |
| indeterminate  | boolean                                          | false  | 当前是否为半选状态                                |
| id             | string                                           | -      | 方便外部带有 for 属性的 label 标签控制当前 checkbox |
| onChange       | (event: ChangeEvent\<HTMLInputElement\>) => void | -      | 值变化时触发的回调函数                              |
| renderIcon     | (props: number \| string) => React.ReactNode        | -      | 自定义图标渲染函数                                  |
| render         | (props: number \| string) => React.ReactNode        | -      | 自定义样式渲染函数                                  |

### Checkbox.Group

| 属性          | 类型                                   | 默认值   | 说明                                                |
| :------------ | :------------------------------------- | :------- | :-------------------------------------------------- |
| type          | string                                 | -        | 显示类型，可选值 `button`、`list`                   |
| value         | number[] \| string[]                   | []       | 选中值                                              |
| defaultValue  | number[] \| string[]                   | []       | 初始选中值                                          |
| disabled      | boolean                                | false    | 是否禁用                                            |
| block         | boolean                                | false    | 子项是否为块级元素                                  |
| iconAlign | string                                 | 'before' | type 为`list`时图标的位置，可选值 `before`、`after` |
| onChange      | (values: number[] \| string[]) => void | -        | 值变化时触发的回调函数                              |

## CSS 变量

### Checkbox

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

### Checkbox.Group

| 属性                       | 默认值 | 说明                 |
| :------------------------- | :----- | :------------------- |
| --group-spacing-vertical   | '8px'  | 组合使用时的纵向间距 |
| --group-spacing-horizontal | '24px' | 组合使用时的横向间距 |

## Checkbox 指令式 API
```js
// 选择
ref.current.check();

// 取消选择
ref.current.uncheck();

// 切换选择
ref.current.toggle();
```
