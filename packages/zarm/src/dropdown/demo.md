# Dropdown 下拉菜单

## 基础用法

```jsx
import { useState } from 'react';
import { Dropdown } from 'zarm';

const Demo = () => {
  const [activeKey, setActiveKey] = useState('');
  return (
    <Dropdown defaultActiveKey='key1'>
      <Dropdown.Item itemKey="key1" title="菜单一">内容一</Dropdown.Item>
      <Dropdown.Item itemKey="key2" title="菜单二">内容二</Dropdown.Item>
    </Dropdown>
  )
};

ReactDOM.render(<Demo />, mountNode);
```
## Dropdown

| 属性               | 	类型                   | 	默认值             | 	说明   |
|:-----------------|:----------------------|:-----------------|:------|
| activeKey        | 	string \             | number           | -     | 	激活的 Item Key |
| defaultActiveKey | 	string \             | number           | -     | 默认激活的 Item Key |
| onChange         | 	(activeKey: string \ | number ) => void | 	-	   | activeKey 变化时触发的回调函数 |
| arrow            | 	ReactNode            | -                | 	箭头样式 |


## DropdownItem

| 属性    | 类型        | 默认值    | 说明   |
|:------|:----------|:-------|:-----|
| key   | string \  | number | -    |  唯一值 |
| title | ReactNode | -      | 标题   |
| arrow | ReactNode | -      | 箭头样式 |
