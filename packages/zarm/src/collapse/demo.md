# Collapse 折叠面板

## 基本用法

```jsx
import { useState } from 'react';
import { Collapse, Checkbox } from 'zarm';

const Demo = () => {
  const [animated, setAnimated] = useState(false);
  const [multiple, setMultiple] = useState(false);
  const [activeKey, setActiveKey] = useState('1');

  return (
    <>
      <Checkbox.Group block style={{ padding: '8px 16px 8px 16px' }}>
        <Checkbox
          value="animated"
          checked={animated}
          onChange={(e) => {
            setAnimated(e.target.checked);
          }}
        >
          开启切换动画
        </Checkbox>
        <Checkbox
          value="multiple"
          checked={multiple}
          onChange={(e) => {
            setMultiple(e.target.checked);
            setActiveKey(e.target.checked ? [] : undefined);
          }}
        >
          允许展开多项
        </Checkbox>
      </Checkbox.Group>
      <Collapse
        disabled
        activeKey={activeKey}
        animated={animated}
        multiple={multiple}
        onChange={(activeKey) => {
          console.log(activeKey);
          setActiveKey(activeKey);
        }}
      >
        <Collapse.Item key="1" title="Header of Item1">
          This is content of item1. This is content of item1. This is content of item1.
        </Collapse.Item>
        <Collapse.Item key="2" title="Header of Item2">
          This is content of item2. This is content of item2. This is content of item2.
        </Collapse.Item>
        <Collapse.Item key="3" title="Header of Item3">
          This is content of item3. This is content of item3. This is content of item3.
        </Collapse.Item>
      </Collapse>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 默认展开项

```jsx
import { Collapse } from 'zarm';

ReactDOM.render(
  <Collapse multiple defaultActiveKey={['0', '1']}>
    <Collapse.Item key="0" title="Header of Item1">
      This is content of item1. This is content of item1. This is content of item1.
    </Collapse.Item>
    <Collapse.Item key="1" title="Header of Item2">
      This is content of item2. This is content of item2. This is content of item2.
    </Collapse.Item>
    <Collapse.Item key="2" title="Header of Item3">
      This is content of item3. This is content of item3. This is content of item3.
    </Collapse.Item>
  </Collapse>,
  mountNode,
);
```

## 禁用子项

```jsx
import { Collapse } from 'zarm';

ReactDOM.render(
  <Collapse multiple defaultActiveKey={['test2']}>
    <Collapse.Item key="test1" title="Header of Item1">
      This is content of item1. This is content of item1. This is content of item1.
    </Collapse.Item>
    <Collapse.Item key="test2" title="Header of Item2" disabled>
      This is content of item2. This is content of item2. This is content of item2.
    </Collapse.Item>
    <Collapse.Item key="test3" title="Header of Item3" disabled>
      This is content of item3. This is content of item3. This is content of item3.
    </Collapse.Item>
  </Collapse>,
  mountNode,
);
```

## API

## Collapse

| 属性             | 类型                                                          | 默认值 | 说明                                     |
| :--------------- | :------------------------------------------------------------ | :----- | :--------------------------------------- |
| multiple         | boolean                                                       | false  | 是否可以同时展开多项                     |
| animated         | boolean                                                       | false  | 是否添加展开动画                         |
| activeKey        | string \| number \| string[] \| number[]                      | -      | 动态更新展开项的索引数组或字符串或数字   |
| defaultActiveKey | string \| number \| string[] \| number[]                      | -      | 初始化默认展开项的索引数组或字符串或数字 |
| onChange         | (activeKey: string \| number \| string[] \| number[]) => void | -      | 点击某一项的回调函数，返回选中的项       |

## Collapse.Item

| 属性     | 类型                      | 默认值 | 说明                 |
| :------- | :------------------------ | :----- | :------------------- |
| title    | ReactNode                 | -      | 每一项的名称         |
| key      | string \| number          | -      | 对应 activeKey       |
| disabled | boolean                   | false  | 是否禁用             |
| onChange | (active: boolean) => void | -      | 点击某一项的回调函数 |
