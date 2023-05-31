# Dropdown 下拉菜单

## 基本用法

```jsx
import { Dropdown } from 'zarm';
import Icons from '@zarm-design/icons';

const Demo = () => {
  const onChange = (key) => {
    console.log('onChange key:', key);
  };
  return (
    <Dropdown arrow={<Icons.ArrowDown theme="primary" size="sm" />} onChange={onChange}>
      <Dropdown.Item key="key1" title="菜单一">
        内容一
      </Dropdown.Item>
      <Dropdown.Item key="key2" title="菜单二" arrow={<Icons.ArrowUp theme="primary" size="sm" />}>
        内容二
      </Dropdown.Item>
    </Dropdown>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 向上展开

```jsx
import { Dropdown } from 'zarm';

const Demo = () => {
  const onClose = () => {
    console.log('onClose callback');
  };
  return (
    <Dropdown direction="up" onClose={onClose}>
      <Dropdown.Item key="key1" title="菜单一">
        内容一
      </Dropdown.Item>
      <Dropdown.Item key="key2" title="菜单二">
        内容二
      </Dropdown.Item>
    </Dropdown>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 禁用

```jsx
import { Dropdown } from 'zarm';

const Demo = () => {
  return (
    <Dropdown disabled>
      <Dropdown.Item key="key1" title="菜单一">
        内容一
      </Dropdown.Item>
      <Dropdown.Item key="key2" title="菜单二">
        内容二
      </Dropdown.Item>
    </Dropdown>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 动画类型

```jsx
import { Dropdown } from 'zarm';

const Demo = () => {
  return (
    <Dropdown animationType="zoom-fade">
      <Dropdown.Item key="key1" title="菜单一">
        内容一
      </Dropdown.Item>
      <Dropdown.Item key="key2" title="菜单二">
        内容二
      </Dropdown.Item>
    </Dropdown>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 默认激活

```jsx
import { Dropdown } from 'zarm';

const Demo = () => {
  return (
    <Dropdown activeKey="key1" defaultActiveKey="key2">
      <Dropdown.Item key="key1" title="菜单一">
        内容一
      </Dropdown.Item>
      <Dropdown.Item key="key2" title="菜单二">
        内容二
      </Dropdown.Item>
    </Dropdown>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

### Dropdown

| 属性             | 类型                  | 默认值 | 说明 |
| :--------------- | :-------------------- | :----- | :--------------------------- |
| activeKey        | number \| string      | -      | 激活的 Item Key |
| defaultActiveKey | number \| string      | -      | 默认激活的 Item Key |
| direction        | 'up' \| 'down'     | 'down'  | 默认下拉方向  |
| arrow            | ReactNode             | -      | 箭头样式 |
| onChange         | (key: string \| null) => void | -      | 值变化时触发的回调函数  |
| maskClosable     | boolean               | true   | 是否点击遮罩层时关闭 |
| maskOpacity      | number                | 0.7    | 默认遮罩层透明度(0-1) |
| animationType    | string                | -      | 菜单动画类型，可选值 `fade`、`door`、`flip`、`rotate`、`zoom`、`zoom-fade`、`move-up`、 `move-down`、`move-left`、`move-right`、`slide-up`、`slide-down`、`slide-left`、`slide-right` |
| animationDuration    | number                | -      | 动画执行时间（单位：毫秒） |

### Dropdown.Item

| 属性          | 类型                     | 默认值   | 说明          |
| :------------ | :-----------------------| :------- | :------------|
| key           | string                  | -        | 唯一的key值   |
| title         | string                  | -        | 子项标题      |
| arrow         | ReactNode                  | -        | 箭头样式      |