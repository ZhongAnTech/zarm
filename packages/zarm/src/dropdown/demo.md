# Dropdown 下拉菜单

## 基本用法

```jsx
import { Dropdown } from 'zarm';
import Icons from '@zarm-design/icons';

const Demo = () => {
  const onChange = key => {
    console.log(key);
  }
  return (
    <Dropdown arrow={<Icons.ArrowDown theme="primary" />} onChange={onChange}>
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

## 向上展开

```jsx
import { Dropdown } from 'zarm';

const Demo = () => {
  const onClose = () => {
    console.log('close callback');
  };

  return (
    <Dropdown direction="bottom" onClose={onClose}>
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

## 默认激活

```jsx
import { Dropdown } from 'zarm';

const Demo = () => {
  return (
    <Dropdown>
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

| 属性             | 类型                  | 默认值 | 说明                   |
| :--------------- | :-------------------- | :----- | :--------------------- |
| activeKey        | number \| string       | -      | 激活的 Item Key        |
| defaultActiveKey | number \| string        | -      | 默认激活的 Item Key    |
| direction        | 'top' \| 'bottom'     | 'top'  | 默认下拉方向           |
| arrow            | ReactNode             | -      | 箭头样式               |
| onChange         | (value: Date) => void | -      | 值变化时触发的回调函数 |
| onClose          | () => void            | -      | 关闭回调               |
| maskClosable          | boolean            | true     | 是否点击遮罩层时关闭               |